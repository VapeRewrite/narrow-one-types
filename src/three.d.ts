import type { Object3D } from "three";
declare const e = 0;
declare const n = 2;
declare function posMod(value: number, divisor: number): number;
declare function wrap(value: number, min: number, max: number): number;
declare function lerp(a: number, b: number, t: number): number;
declare function inverseLerp(a: number, b: number, value: number): number;
declare function clampTo01(n: number): number;
declare function clamp(value: number, min: number, max: number): number;
declare function Po(e: number, t: number, n: number, i: number, r: number, s?: boolean): number;
declare class MapLoadError extends Error {
    name: string;
    constructor(msg: string | undefined, name: string);
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
declare class AssetWorkerMessenger {
    returnTransferSupport: boolean;
    lastRequestId: number;
    sendHandler: ((data: {
        sendData: {
            direction: "request" | "response";
            id: any;
            didThrow: boolean;
            type: string | number;
            returnValue: any;
        };
        transfer: [];
    }) => Promise<void>) | null;
    responseHandlers: null;
    onRequestIdMessageCbs: Map<any, any>;
    serializeErrorHook: ((arg0: unknown) => any) | null;
    deserializeErrorHook: ((arg0: any) => any) | null;
    send: AssetWorkerSend;
    sendWithTransfer: {};
    constructor({ returnTransferSupport, serializeErrorHook, deserializeErrorHook, }?: {
        deserializeErrorHook?: null | undefined;
        returnTransferSupport?: boolean | undefined;
        serializeErrorHook?: null | undefined;
    });
    initialize(e: {
        postMessage: (arg0: any, arg1: {
            transfer: any;
        }) => void;
        addEventListener: (arg0: string, arg1: {
            (this: Worker, e: MessageEvent<any>): void;
            (e: any): void;
        }) => void;
    }, t: {
        mapCached(t: any): void;
        reportMapLoadProgress(t: any, e: any): void;
        firstMapDownloaded(): void;
        mapGameplayObjects(t: any, e: any): void;
        getPlusOnlyVerificationData: () => Promise<any>;
    }): void;
    setSendHandler(e: {
        (t: any): void;
        (t: any): void;
    } | null): void;
    handleReceivedMessage(e: {
        direction: string;
        type: string | number;
        args: any;
        id: any;
    }): Promise<void>;
    setResponseHandlers(e: null): void;
    _sendInternal(type: string, transfer: never[], ...args: any[]): Promise<unknown>;
    onResponseMessage(e: number, t: (n: any) => void): void;
}
export declare const characterPartNames: string[];
declare const partNamesNeedsFlip: string[];
declare const partNames: string[];
declare function recurseChildren(it: Object3D, { skipObjsFn }?: {
    skipObjsFn?: ((obj: Object3D) => boolean) | null;
}): Generator<Object3D>;
declare const zl = 0;
export declare const a7 = 2;
export declare const a1 = 3;
declare const Ul = 5;
export declare const a2 = 6;
declare const kl = 7;
export declare const a8 = 10;
declare const Wl = 0;
export declare const aj = 1;
export declare const ak = 2;
declare const Xl = 3;
export declare const am = 4;
declare const Zl = 5;
export declare const ap = 6;
export declare const a3 = 5;
export declare function a5(e: number): boolean;
declare function $l(e: number, t: number): 0 | 1 | 2 | 3 | 4 | 5;
export declare function a0(e: number): e is 2 | 4 | 5 | 7 | 8 | 10;
export declare function a6(e: number): e is 4 | 5 | 7 | 8;
declare function nc(e: number): e is 8 | 9 | 10;
declare function ic(e: number): e is 1 | 9;
declare function rc(e: number): "-" | "CTF Bows Only" | "Capture the Flag" | "FFA Bows Only" | "Free For All" | "Gun Game" | "King of the Hill" | "Melee Only" | "TDM Bows Only" | "Team Deathmatch" | "Team Elimination";
declare function sc(e: number): string[];
declare const ac = 1;
declare const oc = 2;
declare const lc = 3;
declare const noAttackTeam = 4;
declare const hc: ({
    id: string;
    playersListText: string;
    colorTransform: (e: {
        h: number;
        s: number;
        v: number;
    }) => void;
    cssColor: string;
    cssColorLight: string;
    cssColorDark: string;
} | {
    colorTransform?: undefined;
    id: string;
    playersListText: string;
    cssColor: string;
    cssColorLight: string;
    cssColorDark: string;
})[];
declare function uc(e: number, t: number): boolean;
declare function dc(e: number, t: number, n: number): boolean;
declare function pc(e: number): boolean;
declare function mc(e: number, t: number, n: number): number[];
declare function fc(e: number, t: number, n: number): number[];
export declare function ab(e: number, t: number, n: number, i?: number): number;
export { ic as $, n as D, e as F, kl as G, fc as K, MapLoadError, mc as N, sc as R, AssetWorkerMessenger, pc as U, rc as X, ac as Y, oc as Z, zl as _, clampTo01, Xl as al, Zl as an, lc as ao, partNamesNeedsFlip, clamp, lerp, posMod, hc as n, wrap, partNames, Po as q, noAttackTeam, uc as s, recurseChildren, nc as u, Ul as v, inverseLerp, dc as x, $l as y, Wl as z, };
