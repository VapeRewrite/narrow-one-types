import type { Object3D } from "three";

// ---- unconfirmed numeric constants (could still be three enums) ----
const e = 0;
const n = 2;
// ---- math helpers ----

function posMod(value: number, divisor: number) {
	return ((value % divisor) + divisor) % divisor;
}

function wrap(value: number, min: number, max: number) {
	return posMod(value - min, max - min) + min;
}

function lerp(a: number, b: number, t: number) {
	return a + t * (b - a);
}

function inverseLerp(a: number, b: number, value: number) {
	return (value - a) / (b - a);
}

function clampTo01(n: number) {
	return clamp(n, 0, 1);
}

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}

function mapRange(
	inputStart: number,
	inputEnd: number,
	outputStart: number,
	outputEnd: number,
	value: number,
	clamp = false,
): number {
	let t = inverseLerp(inputStart, inputEnd, value);

	if (clamp) {
		t = clampTo01(t);
	}

	return lerp(outputStart, outputEnd, t);
}

class MapLoadError extends Error {
	constructor(
		msg: string | undefined,
		public override name: string,
	) {
		super(msg);
	}
}

export interface AssetWorkerSend {
	setBasePath(path: string): Promise<unknown>;
	signalAborted(signalId: number): Promise<unknown>;
	removeAbortSignal(signalId: number): Promise<unknown>;
	loadGlbAsset(options: Record<string, unknown>): Promise<unknown>;
	setBaseSkinBuffers(buffers: Record<string, ArrayBuffer>): Promise<unknown>;
	buildSkin(options: Record<string, unknown>): Promise<unknown>;
	buildBow(options: Record<string, unknown>): Promise<unknown>;
	buildConfigObject(options: Record<string, unknown>): Promise<unknown>;
	cacheRemainingMaps(hashes: string[], config: unknown): Promise<unknown>;
	loadMap(request: unknown, requestId: number): Promise<unknown>;
	loadClouds(buffer: ArrayBuffer): Promise<unknown>;
	setConfigBasePath(path: string): Promise<unknown>;
}
class AssetWorkerMessenger {
	returnTransferSupport;
	lastRequestId = 0;
	sendHandler:
		| ((data: {
				sendData: {
					direction: "request" | "response";
					id: any;
					didThrow: boolean;
					type: string | number;
					returnValue: any;
				};
				transfer: [];
		  }) => Promise<void>)
		| null = null;
	responseHandlers = null;
	onRequestIdMessageCbs = new Map();
	serializeErrorHook: ((arg0: unknown) => any) | null;
	deserializeErrorHook: ((arg0: any) => any) | null;
	send: AssetWorkerSend;
	sendWithTransfer;

	constructor({
		returnTransferSupport = false,
		serializeErrorHook = null,
		deserializeErrorHook = null,
	} = {}) {
		this.returnTransferSupport = returnTransferSupport;
		this.serializeErrorHook = serializeErrorHook;
		this.deserializeErrorHook = deserializeErrorHook;
		const i = new Proxy(
			{},
			{
				get: (e, t) => {
					if (typeof t !== "symbol") {
						return async (...e: any) => await this._sendInternal(t, [], ...e);
					}
				},
			},
		);
		this.send = i as unknown as AssetWorkerSend;
		const r = new Proxy(
			{},
			{
				get: (e, t) => {
					if (typeof t !== "symbol") {
						return async (...e: [any, ...any[]]) => {
							const [n, ...i] = e;
							return await this._sendInternal(t, n, ...i);
						};
					}
				},
			},
		);
		this.sendWithTransfer = r;
	}

	initialize(
		e: {
			postMessage: (arg0: any, arg1: { transfer: any }) => void;
			addEventListener: (
				arg0: string,
				arg1: { (this: Worker, e: MessageEvent<any>): void; (e: any): void },
			) => void;
		},
		t: {
			mapCached(t: any): void;
			reportMapLoadProgress(t: any, e: any): void;
			firstMapDownloaded(): void;
			mapGameplayObjects(t: any, e: any): void;
			getPlusOnlyVerificationData: () => Promise<any>;
		},
	) {
		if (e instanceof Worker) {
			this.setSendHandler((t: { sendData: any; transfer: Transferable[] }) => {
				e.postMessage(t.sendData, t.transfer);
			});
			e.addEventListener("message", (e) => {
				this.handleReceivedMessage(e.data);
			});
		} else {
			this.setSendHandler((t: { sendData: any; transfer: any }) => {
				e.postMessage(t.sendData, {
					transfer: t.transfer,
				});
			});
			e.addEventListener("message", (e: { data: any }) => {
				this.handleReceivedMessage(e.data);
			});
		}

		this.setResponseHandlers(t);
	}

	setSendHandler(e: { (t: any): void; (t: any): void } | null) {
		this.sendHandler = e;
	}

	async handleReceivedMessage(e: { direction: string; type: string | number; args: any; id: any }) {
		if (e.direction == "request") {
			if (!this.responseHandlers) {
				throw new Error(
					"Failed to handle message, no request handlers set. Make sure to call `setRequestHandlers` before handling messages.",
				);
			}

			if (!this.sendHandler) {
				throw new Error(
					"Failed to handle message, no send handler set. Make sure to call `setSendHandler` before handling messages.",
				);
			}

			const t = this.responseHandlers[e.type];
			let returnValue;
			let transfer = [];
			let didThrow = false;

			if (t) {
				try {
					returnValue = await t(...e.args);
				} catch (error) {
					returnValue = error;

					if (this.serializeErrorHook) {
						returnValue = this.serializeErrorHook(returnValue);
					}

					didThrow = true;
				}
			}

			if (this.returnTransferSupport && returnValue && !didThrow) {
				const e = returnValue;
				transfer = e.transfer || [];
				returnValue = e.returnValue;
			}

			await this.sendHandler({
				sendData: {
					direction: "response",
					id: e.id,
					didThrow,
					type: e.type,
					returnValue,
				},
				transfer,
			});
		} else if (e.direction == "response") {
			const t = this.onRequestIdMessageCbs.get(e.id);

			if (t) {
				for (const n of t) {
					n(e);
				}
			}

			this.onRequestIdMessageCbs.delete(e.id);
		}
	}

	setResponseHandlers(e: null) {
		this.responseHandlers = e;
	}

	async _sendInternal(type: string, transfer: never[], ...args: any[]) {
		if (!this.sendHandler) {
			throw new Error(
				"Failed to send message, no send handler set. Make sure to call `setSendHandler` before sending messages.",
			);
		}

		const id = this.lastRequestId++;
		const r = new Promise((resolve, reject) => {
			this.onResponseMessage(id, (n: { didThrow: any; returnValue: unknown }) => {
				if (n.didThrow) {
					let e = n.returnValue;

					if (this.deserializeErrorHook) {
						e = this.deserializeErrorHook(e);
					}

					reject(e);
				} else {
					resolve(n.returnValue);
				}
			});
		});
		await this.sendHandler({
			sendData: {
				direction: "request",
				id,
				type,
				args,
			},
			transfer,
		});
		return await r;
	}

	onResponseMessage(e: number, t: (n: any) => void) {
		let n = this.onRequestIdMessageCbs.get(e);

		if (!n) {
			n = new Set();
			this.onRequestIdMessageCbs.set(e, n);
		}

		n.add(t);
	}
} // ---- character parts ----

const characterParts = [
	{
		name: "torso",
	},
	{
		name: "head",
	},
	{
		name: "quiver",
	},
	{
		name: "lowerArm",
		needsFlip: true,
	},
	{
		name: "upperArm",
		needsFlip: true,
	},
	{
		name: "handArm",
		needsFlip: true,
	},
	{
		name: "upperLeg",
		needsFlip: true,
	},
	{
		name: "lowerLeg",
		needsFlip: true,
	},
	{
		name: "footLeg",
		needsFlip: true,
	},
];
export const characterPartNames = characterParts.map((e) => e.name);
const partNamesNeedsFlip = characterParts.filter((e) => e.needsFlip).map((e) => e.name);
const partNames: string[] = [];

for (const e of characterParts) {
	if (e.needsFlip) {
		partNames.push(`${e.name}L`);
		partNames.push(`${e.name}R`);
	} else {
		partNames.push(e.name);
	}
}

function* recurseChildren(
	it: Object3D,
	{ skipObjsFn = null }: { skipObjsFn?: ((obj: Object3D) => boolean) | null } = {},
): Generator<Object3D> {
	if (!skipObjsFn || skipObjsFn(it)) {
		yield it;

		for (const child of it.children) {
			// SON
			for (const childrenOfTheChildren of recurseChildren(child, {
				skipObjsFn,
			})) {
				yield childrenOfTheChildren;
			}
		}
	}
} // ---- game mode / state constants ----

const zl = 0;
export const FREE_FOR_ALL = 2;
export const a1 = 3;
const GUN_GAME = 5;
export const KING_OF_THE_HILL = 6;
const MELEE_ONLY = 7;
export const FFA_2 = 10;
const OFFLINE_GAME_TEAM = 0;
export const aj = 1;
export const ak = 2;
const Xl = 3;
export const am = 4;
const Zl = 5;
export const ap = 6;
export const KOTH_SPHERE_RADIUS = 5;
export function a5(e: number) {
	return e != 4 && e != 5 && e != 7 && e != 8;
}

function $l(e: number, t: number) {
	if (e == noAttackTeam) {
		return 0;
	}

	if (t == 2 || t == 10 || t == 3) {
		if (e == ac) {
			return 1;
		}

		if (e == oc) {
			return 2;
		}
	} else {
		if (t == 4 || t == 5 || t == 7 || t == 8) {
			return 5;
		}

		if (isCTF(t) || t == 6) {
			if (e == ac) {
				return 3;
			}

			if (e == oc) {
				return 4;
			}
		}
	}

	return 0;
}

export function a0(e: number) {
	return e == 4 || e == 2 || e == 10 || e == 7 || e == 8 || e == 5;
}
export function a6(e: number) {
	return e == 4 || e == 7 || e == 8 || e == 5;
}

function isBowOnlyCTF(e: number) {
	return e == 8 || e == 9 || e == 10;
}

function isCTF(gameID: number) {
	return gameID == 1 || gameID == 9;
}

function rc(e: number) {
	if (e == 1) return "Capture the Flag";
	if (e == 2) return "Team Deathmatch";
	if (e == 3) return "Team Elimination";
	if (e == 4) return "Free For All";
	if (e == 5) return "Gun Game";
	if (e == 6) return "King of the Hill";
	if (e == 7) return "Melee Only";
	if (e == 8) return "FFA Bows Only";
	if (e == 9) return "CTF Bows Only";
	if (e == 10) return "TDM Bows Only";
	return "-";
}

function sc(e: number) {
	const t = [];
	t.push("avatar");
	t.push("playerName");

	if (isCTF(e)) {
		t.push("flags");
	}

	t.push("kills");
	t.push("deaths");

	if (e == 2 || e == 10 || e == 4 || e == 7 || e == 8) {
		t.push("kd");
	}

	t.push("totalScore");

	if (false) {
		t.push("elo");
	}

	return t;
} // ---- teams ----

const ac = 1;
const oc = 2;
const lc = 3;
const noAttackTeam = 4;
const teamData = [
	{
		id: "preJoin",
		playersListText: "Players",
		colorTransform: (e: { h: number; s: number; v: number }) => {
			e.h += 0.06;
			e.s *= 0;
			e.v *= 0.4;
		},
		cssColor: "#a3a3a3",
		cssColorLight: "#ececec",
		cssColorDark: "#717171",
	},
	{
		id: "red",
		playersListText: "Team Red",
		cssColor: "#e5302c",
		cssColorLight: "#ffd9d1",
		cssColorDark: "#a32321",
	},
	{
		id: "blue",
		playersListText: "Team Blue",
		colorTransform: (e: { h: number }) => {
			e.h += 0.6;
		},
		cssColor: "#24a3dd",
		cssColorLight: "#b0e6ff",
		cssColorDark: "#1d749e",
	},
	{
		id: "green",
		playersListText: "Player",
		colorTransform: (e: { h: number; s: number; v: number }) => {
			e.h += 0.34;
			e.s *= 0.6;
			e.v *= 0.2;
		},
		cssColor: "#2d702f",
		cssColorLight: "#abecad",
		cssColorDark: "#225423",
	},
	{
		id: "spectator",
		playersListText: "Spectators",
		colorTransform: (e: { h: number; s: number; v: number }) => {
			e.h += 0.06;
			e.s *= 0;
			e.v *= 2;
		},
		cssColor: "#bababa",
		cssColorLight: "#ececec",
		cssColorDark: "#858585",
	},
] as const;

function isEnemy(team1: number, team2: number) {
	return (
		(team1 == 0 && team2 == 0) ||
		(team1 != noAttackTeam && team2 != noAttackTeam && (team1 == 3 ? team2 == 3 : team1 != team2))
	);
}

function dc(e: number, t: number, n: number) {
	return t == noAttackTeam || ((t == ac || t == oc) && (e == 3 ? n == ac || n == oc : t == n));
}

function pc(e: number) {
	return e != 0 && e != noAttackTeam;
} // ---- color conversion ----

function mc(e: number, t: number, n: number) {
	e = clampTo01(e);
	t = clampTo01(t);
	n = clampTo01(n);
	const i = Math.max(e, t, n);
	const r = Math.min(e, t, n);
	const s = i - r;
	let a = 0;
	const o = i == 0 ? 0 : s / i;
	const l = i;

	switch (i) {
		case r:
			a = 0;
			break;

		case e:
			a = t - n + s * (t < n ? 6 : 0);
			a /= s * 6;
			break;

		case t:
			a = n - e + s * 2;
			a /= s * 6;
			break;

		case n:
			a = e - t + s * 4;
			a /= s * 6;
	}

	return [a, o, l];
}

function fc(e: number, t: number, n: number) {
	e = posMod(e, 1);
	t = clampTo01(t);
	n = clampTo01(n);
	const i = Math.floor(e * 6);
	const r = e * 6 - i;
	const s = n * (1 - t);
	const a = n * (1 - r * t);
	const o = n * (1 - (1 - r) * t);
	let l = 0;
	let c = 0;
	let h = 0;

	switch (i % 6) {
		case 0:
			l = n;
			c = o;
			h = s;
			break;

		case 1:
			l = a;
			c = n;
			h = s;
			break;

		case 2:
			l = s;
			c = n;
			h = o;
			break;

		case 3:
			l = s;
			c = a;
			h = n;
			break;

		case 4:
			l = o;
			c = s;
			h = n;
			break;

		case 5:
			l = n;
			c = s;
			h = a;
	}

	return [l, c, h];
} // `ab` is easing (uses No, which is kept below)

function No(e: number, t = 1) {
	const n = 1 / Math.log(2);
	const i = 2 / Math.log(2);
	const r = Math.max(i / t, i);
	const s = Math.log2(n / r) / r;

	const a = (e: number) => 2 ** (e * r);

	const o = a(s);

	const l = (e: number) => a(e + s - o);

	const c = Math.min(2 / (t + 1), 1);

	if ((h = (e - 0.5) * c + 0.5) < o) {
		return l(h);
	}

	if (h > 1 - o) {
		return ((e) => 1 - l(1 - e))(h);
	}

	return ((e) => clampTo01(e))(h);
	var h;
}

export function ab(e: number, t: number, n: number, i = 1) {
	return (e = lerp(t, n, (e = No((e = inverseLerp(t, n, e)), i))));
}
export {
	isCTF,
	n as D,
	e as F,
	MELEE_ONLY,
	fc as K,
	MapLoadError,
	mc as N,
	sc as R,
	AssetWorkerMessenger,
	pc as U,
	rc as X,
	ac as Y,
	oc as Z,
	zl as _,
	clampTo01,
	Xl as al,
	Zl as an,
	lc as ao,
	partNamesNeedsFlip,
	clamp,
	lerp,
	posMod,
	teamData,
	wrap,
	partNames,
	mapRange,
	noAttackTeam,
	isEnemy,
	recurseChildren,
	isBowOnlyCTF as u,
	GUN_GAME as GUN_GAME,
	inverseLerp,
	dc as x,
	$l as y,
	OFFLINE_GAME_TEAM as z,
};
