import { AssetWorkerMessenger, teamData } from "./three";
import { BufferGeometry, Mesh, Object3D, Matrix4, Vector3, Quaternion, Scene, PlaneGeometry, Color, ShaderMaterial, Box3, Sphere, Vector2, PerspectiveCamera, Line, IcosahedronGeometry, Group, WebGLRenderer, Texture, Material } from "three";
declare class IndexedDB {
    dbName: string;
    objectStoreNames: string[];
    _dbPromise: Promise<IDBDatabase>;
    constructor(dbName?: string, { objectStoreNames }?: {
        objectStoreNames?: string[] | undefined;
    });
    _initDb(): Promise<void>;
    closeConnection(): Promise<void>;
    _promisifyRequest<T>(openRequest: IDBRequest<T>): Promise<T>;
    deleteDb(): Promise<void>;
    get<T = unknown>(key: IDBValidKey | IDBKeyRange, storeName?: string): Promise<T | undefined>;
    set(key: IDBValidKey, value: unknown, storeName?: string): Promise<void>;
    getSet(key: IDBValidKey | undefined, getValue: (cur: unknown) => unknown, storeNames?: string, remove?: boolean): Promise<void>;
    delete(key: string, storeName?: string | undefined): Promise<void>;
}
type SettingValue = string | number | boolean;
export declare class SettingsManager {
    indexedDb: IndexedDB;
    defaultValues: {
        sfxVolume: number;
        musicVolume: number;
        sfxDistanceCutoff: number;
        fov: number;
        gamemodeMatchmaking: string;
        autoFullScreen: boolean;
        quality: number;
        antialias: boolean;
        smoothFiltering: boolean;
        mouseAcceleration: boolean;
        touchLookAcceleration: boolean;
        mouseSensitivity: number;
        invertMouseY: boolean;
        autoShoot: boolean;
        walkHeadBob: boolean;
        landHeadBob: boolean;
        theme: string;
        hideUi: boolean;
        showFirstPersonWeapon: boolean;
        lowerFirstPersonWeaponWhenWalking: boolean;
        uiScale: number;
        showStats: boolean;
        smoothCam: boolean;
        flyInSpectateTeam: boolean;
        autoSkipStatsScreen: boolean;
        autoReconnect: boolean;
        requireAddressBarHide: boolean;
        chatEnabled: boolean;
        chatProfanityFilterEnabled: boolean;
        crosshairAccuracyOffset: number;
        crosshairStyle: string;
        crosshairColor: string;
        crosshairOutlineColor: string;
    };
    currentValues: Map<string, SettingValue>;
    onValueChangeCbs: Map<string, Set<(v: SettingValue) => void>>;
    onSettingsLoadedCbs: Set<() => void>;
    _settingsLoaded: boolean;
    _isLoadingSettings: boolean;
    constructor(indexedDb: IndexedDB);
    init(): void;
    loadSettings(): Promise<void>;
    get settingsLoaded(): boolean;
    saveSettings(): Promise<boolean>;
    getValue(k: string): SettingValue | undefined;
    setValue(k: string, v: SettingValue): void;
    fireValueChange(k: string, v: SettingValue): void;
    onValueChange(k: string, cb: (v: SettingValue) => void): void;
    removeOnValueChange(k: string, cb: (v: SettingValue) => void): void;
    onSettingsLoaded(cb: () => void): void;
    waitForSettingsLoad(): Promise<void>;
}
interface MainMenuButtonProps extends ButtonProps {
    iconSizeMultiplier?: number;
    isUpdateIcon?: boolean;
    isExitButton?: boolean;
}
declare class MainMenuButton {
    containerEl: HTMLDivElement;
    el: HTMLButtonElement;
    textEl: HTMLDivElement;
    iconEl?: HTMLDivElement;
    visible: boolean;
    constructor({ text, icon, testLabel, iconSizeMultiplier, isUpdateIcon, isExitButton, onClick, }?: MainMenuButtonProps);
    setVisibility(visible: boolean): void;
    click(onlyIfVisible?: boolean): void;
    setText(text: string): void;
}
declare class CurrencyContainer {
    #private;
    _amount: number;
    el: HTMLDivElement;
    textEl: HTMLSpanElement;
    isAnimatingAmount: boolean;
    animatingStartValue: number;
    animatingTargetValue: number;
    animatingCurrentValue: number;
    animatingDurationMs: number;
    animatingStartTime: number;
    animatingSfxEnabled: boolean;
    lastIncrementSfxTime: number;
    boundAnimationLoop: () => void;
    constructor({ amount, testLabel }?: {
        amount?: number;
        testLabel?: string;
    });
    setAmount(amount: number): void;
    /**
     * @param text converted into a string via `String(text)`
     */
    _setAmountText(text: number): void;
    get amount(): number;
    animateAmount(amount: number, { durationMultiplier, sfx }?: {
        durationMultiplier?: number;
        sfx?: boolean;
    }): void;
    animationLoop(): void;
    waitForTargetReached(): Promise<void>;
}
interface ButtonProps {
    text?: string;
    ariaLabel?: string;
    onClick?: (() => void) | null;
    showCurrency?: boolean;
    currency?: number;
    extraClasses?: string[];
    testLabel?: string;
    isIconButton?: boolean;
    icon?: string | null;
    hasPeliPlusIcon?: boolean;
    iconSize?: number;
    iconIsInvertable?: boolean;
}
declare class CustomButton {
    #private;
    el: HTMLButtonElement;
    currencyContainer?: CurrencyContainer;
    textEl: HTMLSpanElement;
    _iconSize: number;
    _iconIsInvertable: boolean;
    _currentIcon: string | null;
    _visible: boolean;
    constructor({ text, ariaLabel, onClick, showCurrency, currency, extraClasses, testLabel, isIconButton, icon, hasPeliPlusIcon, iconSize, iconIsInvertable, }?: ButtonProps);
    get visible(): boolean;
    set visible(visible: boolean);
    click(): void;
    onClick(handler: (event: PointerEvent) => void): void;
    set enabled(enabled: boolean);
    get enabled(): boolean;
    setIcon(icon: string | null): void;
    setPeliPlusIcon(): void;
    setText(text: string | null): void;
}
declare class Dialog {
    gameWrapper: HTMLElement;
    allowCurtainClose: boolean;
    customOnCurtainClickCb: (() => boolean) | null;
    needsCurtain: boolean;
    needsUnlockedPointer: boolean;
    indexPriority: number;
    zIndex: number;
    el: HTMLDivElement;
    _transitionVisible: boolean;
    startVisible: boolean;
    _visible: boolean;
    _inert: boolean;
    onVisibilityChangeCbs: Set<(visible: boolean) => void>;
    onInertChangeCbs: Set<(inert: boolean) => void>;
    closed: boolean;
    onCloseCbs: Set<() => void>;
    titleEl?: HTMLHeadingElement;
    constructor(gameWrapper: HTMLElement, { allowCurtainClose, customOnCurtainClickCb, startVisible, needsCurtain, needsUnlockedPointer, extraClasses, testLabel, indexPriority, title, }?: {
        allowCurtainClose?: boolean;
        customOnCurtainClickCb?: (() => boolean) | null;
        startVisible?: boolean;
        needsCurtain?: boolean;
        needsUnlockedPointer?: boolean;
        extraClasses?: string[];
        testLabel?: string;
        indexPriority?: number;
        title?: string | null;
    });
    destructor(): void;
    get rootEl(): HTMLDivElement;
    setZIndex(zIndex: number): void;
    setInert(inert: boolean): void;
    get inert(): boolean;
    set visible(visible: boolean);
    get visible(): boolean;
    get transitionVisible(): boolean;
    close(): void;
    onVisibilityChange(visible: boolean): void;
    onClose(): void;
    addOnVisibilityChangeCb(cb: (visible: boolean) => void): void;
    addOnInertChangeCb(cb: (inert: boolean) => void): void;
    addOnCloseCb(cb: () => void): void;
    buttonsContainer?: HTMLDivElement;
    addButtonsContainer({ vertical, parent, }?: {
        vertical?: boolean;
        parent?: HTMLElement;
    }): void;
    addButton(props: ButtonProps): CustomButton;
    removeButton(button: CustomButton): void;
}
type SettingType = "color" | "slider" | "toggle" | "enum";
interface BaseSettingOptions<T extends SettingType, V> {
    text: string;
    type: T;
}
interface ColorSettingOptions extends BaseSettingOptions<"color", string> {
}
interface EnumSettingOptions extends BaseSettingOptions<"enum", string> {
    enumValues: {
        [k: string]: string;
    };
}
interface SliderSettingOptions extends BaseSettingOptions<"slider", number> {
    min: number;
    /** @default 1 */
    step?: number;
    max: number;
    /** @default false */
    triggerOnChange?: boolean;
}
interface ToggleSettingOptions extends BaseSettingOptions<"toggle", boolean> {
}
type SettingOptions = ColorSettingOptions | SliderSettingOptions | ToggleSettingOptions | EnumSettingOptions;
declare class Setting<V extends SettingValue, O extends SettingOptions> {
    type: "color" | "enum" | "slider" | "toggle";
    el: HTMLLabelElement;
    valueEl?: HTMLDivElement | undefined;
    sliderEl?: HTMLInputElement | undefined;
    dropdownEl?: HTMLSelectElement | undefined;
    toggleEl?: HTMLInputElement | undefined;
    colorEl?: HTMLInputElement | undefined;
    textEl: HTMLDivElement;
    onValueChangeCbs: Set<(value: V) => void>;
    constructor(options: O);
    setValue(value: V): void;
    getValue(): V;
    onValueChange(cb: (value: V) => void): void;
    fireOnValueChange(): void;
    setDisabled(disabled: boolean): void;
}
declare class SettingsDialog extends Dialog {
    settingsManager: SettingsManager;
    dialogManager: DialogManager;
    titleEl: HTMLHeadingElement;
    settingsListEl: HTMLDivElement;
    linkedAccountsEl: HTMLDivElement;
    accountButtonsEl: HTMLDivElement;
    loginButton: CustomButton;
    linkAccountButton: CustomButton;
    manageAccountButton: CustomButton;
    logoutButton: CustomButton;
    logoutEverywhereButton: CustomButton;
    deleteAccountButton: CustomButton;
    accountIdContainer: HTMLDivElement;
    accountIdEl: HTMLSpanElement;
    boundUpdateAccountButtons: () => void;
    constructor(gameWrapper: HTMLElement, settingsManager: SettingsManager, dialogManager: DialogManager);
    destructor(): void;
    createLinkedAccountEl({ email, issuer, unlinkButtonOptions, }: {
        email: string;
        issuer: string;
        unlinkButtonOptions?: string | (() => Promise<boolean>) | null;
    }): void;
    updateAccountState(): void;
    createSettingsGroup(groupName: string): HTMLDivElement;
}
interface BowConfig {
    id: string;
    uiName: string;
    bowId: string;
    shopSkeletonLayer: string;
    bowHandleShopCategories: string[];
    bowTipShopCategories: string[];
    bowShopCamPosition: string;
    bowHandleShopCamPosition: string;
    bowTipShopCamPosition: string;
}
declare class AssetPackage {
    url: string;
    isDownloading: boolean;
    loaded: boolean;
    arrayBuffer: ArrayBuffer | null;
    fileLocations: {
        path: string;
        start: number;
        length: number;
    }[];
    onLoadCbs: (() => void)[];
    onProgressCbs: ((percentage01: number) => void)[];
    lastProgressValue: number;
    textureCache: Record<string, unknown>;
    constructor(url: string);
    startDownloading(): Promise<void>;
    parseFilePositions(buffer: ArrayBuffer): void;
    onLoad(cb: () => void): void;
    onProgress(cb: (percentage01: number) => void): void;
    waitForLoad(): Promise<void>;
    hasFile(path: string): Promise<boolean>;
    getFileAsBuffer(path: string): Promise<ArrayBuffer>;
    getAsObjectUrl(path: string, mimeType: string): Promise<string | null>;
    getAsSvg(path: string): Promise<string | null>;
    getAsText(path: string): Promise<string>;
    getAsJSON(path: string): Promise<unknown>;
    blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer>;
}
interface AddPackageOpts {
    /** @default null */
    waitForOtherPackages: string[] | null;
    /** @default 1 */
    expectedOtherPackageCount: number;
    /** @default false */
    manualDownload: boolean;
}
declare class AssetsManager {
    onPackageAddCbs: (() => void)[];
    packages: {
        [k: string]: AssetPackage;
    };
    lastWorkerRequestId: number;
    onWorkerMessageCbs: Map<number, Set<{
        cb: () => void;
        endOnly: boolean;
    }>>;
    onWorkerErrorCbs: Map<any, Set<() => void>>;
    messenger: AssetWorkerMessenger;
    workerPromise: Promise<any>;
    abortSignalIds: WeakMap<AbortSignal, number>;
    lastAbortSignalId: number;
    constructor();
    loadWorker(): Promise<any>;
    getMessenger(): Promise<AssetWorkerMessenger>;
    registerAbortSignal(signal: AbortSignal): Promise<{
        abortSignalId: number;
        messenger: AssetWorkerMessenger;
        unregister: () => void;
    }>;
    addPackage(name: string, { waitForOtherPackages, expectedOtherPackageCount, manualDownload, }?: Partial<AddPackageOpts>): AssetPackage | undefined;
    waitAndDownloadPack(curPkg: AssetPackage, otherPackages: string[] | null, expOtherPkgCount: number): Promise<void>;
    waitForPackageAdd(): Promise<void>;
    getPackage(name: string): AssetPackage | undefined;
    getPackageAsync(name: string): Promise<AssetPackage>;
    onWorkerMessage(k: unknown, cb: () => void, endOnly?: boolean): void;
    onWorkerError(t: unknown, cb: () => void): void;
    static deserializeThreeObject(t: any): Mesh | Object3D | null;
    static deserializeThreeObjectRecursive(t: any, e: any): Mesh | Object3D;
    loadGlbViaWorker(t: unknown, { packageName, teamId, keepCustomProperties, merge, signal, }?: {
        keepCustomProperties?: never[] | undefined;
        merge?: boolean | undefined;
        packageName?: string | undefined;
        signal?: AbortSignal | null | undefined;
        teamId?: number | undefined;
    }): Promise<Mesh<BufferGeometry, Material[] | Material> | Object3D | null>;
}
export interface SkinColorMultiplier extends Array<number> {
    0: number;
    1: number;
    2: number;
}
export interface SkinData {
    gender?: PlayerGender;
    equippedSkinIds?: string[];
    unequippedSkinIds?: string[];
    hairColorMultiplier?: ColorArray;
    eyebrowColorMultiplier?: ColorArray;
    beardColorMultiplier?: ColorArray;
    presetId?: number | null;
    [key: string]: unknown;
}
export interface ShopSkinSide {
    additions?: Record<string, string[]>;
    removals?: Record<string, string[]>;
    replaceAssets?: {
        asset: string;
        replaceWith: string;
    }[];
    [key: string]: unknown;
}
export interface ShopItemSeasonalRange {
    startDay?: number;
    endDay?: number;
    startMonth?: number;
    endMonth?: number;
}
export interface MeleeSkinConfig {
    meleeId: string;
    skin: string;
    [key: string]: unknown;
}
export interface ShopItemConfig {
    id: string;
    slots?: string[];
    categories?: string[];
    requiredPeliEntitlements?: string[];
    showFullBodyInShopItem?: boolean;
    shopVisibility?: string;
    hasRewardedAd?: boolean;
    price?: number;
    seasonalRange?: ShopItemSeasonalRange | null;
    maleSkin?: ShopSkinSide;
    femaleSkin?: ShopSkinSide;
    bowSkin?: {
        bowId: string;
        skins: string[];
        [key: string]: unknown;
    };
    meleeSkin?: MeleeSkinConfig;
    arrowSkin?: string;
    statClasses?: Record<string, number>;
    legMoveAmount?: number;
    colorizableCategory?: string;
    [key: string]: unknown;
}
export interface SkinObjectOpts {
    teamId: number;
    teamColor?: {
        r: number;
        g: number;
        b: number;
    };
    skin: SkinData;
    rawSkin?: unknown;
    bow?: BowAssetConfig | null;
}
export interface PreviewShopItemConfig {
    itemId?: string;
    colorCategory?: string;
    colorMultiplier?: ColorArray;
}
declare class SkinsManager {
    purchasableItems: Map<string, ShopItemConfig>;
    defaultSkinPresets: SkinData[];
    skinPresets: SkinData[];
    classSkins: Record<string, SkinData>;
    onSkinConfigChangeCbs: Set<() => void>;
    constructor();
    init(): void;
    loadSkinPreference<T = unknown>(key: IDBValidKey): Promise<T | undefined>;
    loadSkinIdsPreference(key: IDBValidKey): Promise<Set<string>>;
    initBaseSkins(): Promise<void>;
    skinObjectOptsToCacheKey(opts: SkinObjectOpts): string;
    getSkinObject(opts: SkinObjectOpts, abortSignal: AbortSignal): Promise<Object3D | null>;
    getBowObject(bowConfig: Record<string, unknown>, abortSignal: AbortSignal): Promise<{
        bow: Object3D | null;
        arrowPointIdleMatrix: Matrix4;
        arrowPointLoadedMatrix: Matrix4;
    }>;
    buildConfigObject(config: Record<string, unknown>, abortSignal: AbortSignal): Promise<{
        asset: Object3D | null;
    }>;
    addShopItemToSkinData(itemId: string, skinData: SkinData): Set<string>;
    removeShopItemFromSkinData(itemId: string, skinData: SkinData): void;
    addPreset({ fireConfigChanged }?: {
        fireConfigChanged?: boolean;
    }): void;
    duplicatePreset(_presetIndex: number): void;
    deletePreset(presetIndex: number): void;
    getPreset(presetIndex: number, throwIfMissing?: boolean): SkinData;
    addShopItemToPreset(itemId: string, presetId: number): Set<string>;
    removeShopItemFromPreset(itemId: string, presetId: number): void;
    setPresetGender(presetId: number, gender: PlayerGender): void;
    setPresetSkinItemColor(presetId: number, category: string, colorMultiplier: ColorArray): void;
    savePresets(): Promise<void>;
    getClassSkinData(classId: string, createIfMissing: boolean): SkinData;
    getClassSkinDataWithAppliedPreset(classId: string): SkinData;
    setClassPreset(classId: string, presetId: number | null): void;
    addShopItemToClass(itemId: string, classId: string): void;
    removeShopItemFromClass(itemId: string, classId: string): void;
    setClassGender(classId: string, gender: PlayerGender): void;
    setClassSkinItemColor(classId: string, category: string, colorMultiplier: ColorArray): void;
    saveClassSkins(): void;
    fireConfigChanged(): void;
    addItemAndRemoveDuplicateSlots(equippedIds: Set<string>, itemId: string): Set<string>;
    getStatClassValuesFromShopSkinIds(skinIds: string[], bowId: string | null): {
        statClassValues: Map<string, number>;
        legMoveAmount: number;
    };
    skinNetworkDataToSkinConfig(skinData: SkinData): {
        equippedItems: Record<string, string[]>;
        colorizedItems: {
            assetName: string;
            colorMultiplier: ColorArray;
            joints: string[];
        }[];
    };
    skinNetworkDataToBowAssetData(targetBowID: string, opts: {
        equippedSkinIds?: string[];
    }): {
        skins: string[];
        arrowSkin: string;
    };
    skinNetworkDataToMeleeSkinConfig(skinData: SkinData): MeleeSkinConfig | null;
    skinNetworkDataToArrowSkinConfig(config: {
        equippedSkinIds?: string[];
    }): string;
    getSkinFromShopItem(shopItem: ShopItemConfig, gender: PlayerGender): ShopSkinSide | null;
    getConfigForPreviewShopItemId(skinData: SkinData, { itemId, colorCategory, colorMultiplier }: PreviewShopItemConfig): {
        gender: PlayerGender | undefined;
        equippedSkinIds: string[];
        beardColorMultiplier: ColorArray | undefined;
        hairColorMultiplier: ColorArray | undefined;
        eyebrowColorMultiplier: ColorArray | undefined;
    };
    onSkinConfigChange(cb: () => void): void;
    removeOnSkinConfigChange(cb: () => void): void;
}
export interface PagedViewStructure {
    header?: string;
    headerVisible?: boolean;
    itemName?: string;
    buttonIcon?: string;
    hasPeliPlusIcon?: boolean;
    buttonIconSize?: number;
    buttonVisible?: () => boolean;
    onBackButtonClick?: () => void;
    onBecomeVisible?: () => void;
    rightCorner?: (container: HTMLDivElement) => void;
    subPages?: PagedViewStructure[];
    customSubPage?: (container: HTMLDivElement) => void;
    customSubPageDestroyed?: (container: HTMLDivElement) => void;
}
declare class PagedView {
    el: HTMLDivElement;
    createdPageEls: {
        el: HTMLDivElement;
        structure: PagedViewStructure;
        visible: boolean;
        customSubPageEl: HTMLDivElement | null;
        createdButtons: {
            button: CustomButton;
            structure: PagedViewStructure;
        }[];
    }[];
    rootStructure: PagedViewStructure | null;
    constructor({ extraClasses }?: {
        extraClasses?: string[];
    });
    setActiveStructure(rootStructure: PagedViewStructure): void;
    createAndPushPage(page: PagedViewStructure): void;
    popPage(): void;
    updateButtonVisibilies(): void;
    jumpToSubPage(subPage: PagedViewStructure): void;
    updatePageVisibilities(): void;
}
export interface SkeletonLoadCb {
    resolve(): void;
    reject(err: unknown): void;
}
declare class PoseLayer {
    skeletonPath: string;
    _currentGender: PlayerGender;
    skeletonObject: Object3D | null;
    onSkeletonLoadCbs: Set<SkeletonLoadCb>;
    onObjectLinksBuilt: Set<() => void>;
    weight: number;
    currentlyLoadingPoseAbortController: AbortController | null;
    objectLinksBuilt: boolean;
    objectLinks: [Object3D, Object3D][];
    constructor(skeletonPath: string, _currentGender: PlayerGender);
    setGender(gender: PlayerGender): void;
    reloadPose(): Promise<void>;
    waitForLoad(): Promise<void>;
    buildObjectLinks(t: Object3D): void;
    waitForObjectLinks(): Promise<void>;
    apply(): void;
}
type PlayerGender = "male" | "female";
interface SkeletonOpts {
    /** @default null */
    player?: Player | null;
    /** @default "male" */
    gender?: PlayerGender;
}
declare class PlayerSkeleton {
    player: Player | null;
    isInit: boolean;
    onInitCbs: Set<() => void>;
    onAllLinkLayerObjectsBuiltCbs: Set<() => void>;
    _currentGender: PlayerGender;
    poseLayers: PoseLayer[];
    skeletonMatrixObjects: Object3D[];
    baseSkeletonObject: Object3D | null;
    headObj: Object3D | null;
    bodyObj: Object3D | null;
    armLObj: Object3D | null;
    armRObj: Object3D | null;
    legObjectsL: {
        upper: Object3D;
        lower: Object3D;
        foot: Object3D;
    } | null;
    legObjectsR: {
        upper: Object3D;
        lower: Object3D;
        foot: Object3D;
    } | null;
    initCalled: boolean;
    constructor({ player, gender }?: SkeletonOpts);
    init(): Promise<void>;
    waitForLoad(): Promise<void>;
    assertInit(): void;
    createPoseLayer(skeletonPath: string): PoseLayer;
    addPoseLayer(skeletonPath: string): PoseLayer;
    removePoseLayer(t: PoseLayer): void;
    get gender(): PlayerGender;
    setGender(t: PlayerGender): void;
    linkLayerObjects(t: PoseLayer): Promise<void>;
    get allObjectLinksBuilt(): boolean;
    waitForLinkLayerObjects(): Promise<void>;
    replacePoseLayer(t: number, e: string): PoseLayer;
    insertPoseLayer(t: number, e: string): PoseLayer;
    setLookRotY(t: number, e: {
        head?: number;
        armL?: number;
        armR?: number;
    }): void;
    applyLookRotation(t: Object3D, e: Vector3, i: number): void;
    applyLayers(): void;
    updateMatrices(): void;
    getMatrices(): Matrix4[];
}
interface WeatherParams {
    colorMultiplier: Color;
    colorAdder: Color;
    saturation: number;
    skyLowColor: Color;
    skyHighColor: Color;
    skyMidColor: Color;
    skyPower: number;
    fogAmount: number;
    fogHeightAmount: number;
    fogHeightOffset: number;
    fogHeightDistFalloff: number;
    fogHeightAmountMin: number;
    fogHeightAmountMax: number;
}
declare class GameMaterials {
    materialsCache: Map<string, Material>;
    extraMaterials: Set<Material>;
    shadersHavePrecompiled: boolean;
    hashes: string;
    saturateColorFn: string;
    gradientNoiseFn: string;
    basicUnlitMat: ShaderMaterial;
    basicUnlitMatDouble: ShaderMaterial;
    skyDomeMat: ShaderMaterial;
    lightsMat: ShaderMaterial;
    screenFlashMat: ShaderMaterial;
    snowMat: ShaderMaterial;
    bowMorph: ShaderMaterial;
    bowMorphDouble: ShaderMaterial;
    arrowTrailMat: ShaderMaterial;
    defaultMatSkinned: ShaderMaterial;
    defaultDoubleMatSkinned: ShaderMaterial;
    constructor();
    init(): void;
    precompileShaders(): Promise<void>;
    allMaterials(): Generator<Material, void, unknown>;
    getMaterialByName(name: string): Material | undefined;
    addCachedMaterial(material: Material): void;
    addExtraMaterial(material: Material): void;
    removeExtraMaterial(material: Material): void;
    applyWeatherParams(t: WeatherParams): void;
    static resetWeatherUniforms(t: ShaderMaterial): void;
    setLightningValue(t: number): void;
    buildVertexShader({ name, extraVariables, modifyWorldPosFn, modifyWorldPosAfterColorFn, modifyWorldPosBeforeModelMatrixFn, modifyColFn, extraFunctions, fog, needsFogColor, applyWorldColor, useMvp, needsModelPosVarying, needsUv, }?: {
        applyWorldColor?: boolean | undefined;
        extraFunctions?: string | undefined;
        extraVariables?: string | undefined;
        fog?: boolean | undefined;
        modifyColFn?: string | undefined;
        modifyWorldPosAfterColorFn?: string | undefined;
        modifyWorldPosBeforeModelMatrixFn?: string | undefined;
        modifyWorldPosFn?: string | undefined;
        name?: string | undefined;
        needsFogColor?: boolean | undefined;
        needsModelPosVarying?: boolean | undefined;
        needsUv?: boolean | undefined;
        useMvp?: boolean | undefined;
    }): string;
    buildFragShader({ name, extraVariables, modifyColFn, modifyTexColFn, extraFunctions, fog, needsFogColor, needsModelPosVarying, needsUv, }?: {
        extraFunctions?: string | undefined;
        extraVariables?: string | undefined;
        fog?: boolean | undefined;
        modifyColFn?: string | undefined;
        modifyTexColFn?: string | undefined;
        name?: string | undefined;
        needsFogColor?: boolean | undefined;
        needsModelPosVarying?: boolean | undefined;
        needsUv?: boolean | undefined;
    }): string;
    createMaterial({ name, vertexShaderOpts, fragmentShaderOpts, exactVertShader, exactFragShader, uniforms, defaultAttributeValues, fog, needsFogColor, applyWorldColor, needsModelPosVarying, needsUv, depthWrite, depthTest, side, }?: {
        applyWorldColor?: boolean | undefined;
        defaultAttributeValues?: {} | undefined;
        depthTest?: boolean | undefined;
        depthWrite?: boolean | undefined;
        exactFragShader?: null | undefined;
        exactVertShader?: null | undefined;
        fog?: boolean | undefined;
        fragmentShaderOpts?: {} | undefined;
        name?: string | undefined;
        needsFogColor?: boolean | undefined;
        needsModelPosVarying?: boolean | undefined;
        needsUv?: boolean | undefined;
        side?: number | undefined;
        uniforms?: {} | undefined;
        vertexShaderOpts?: {} | undefined;
    }): ShaderMaterial;
}
declare class SkinModel {
    skinObjectOpts: SkinObjectOpts;
    isInit: boolean;
    destructed: boolean;
    obj: Object3D | null;
    materials: ShaderMaterial[];
    lastSetMatrices: Matrix4[] | null;
    onInitCbs: Set<() => void>;
    getSkinAbortController: AbortController;
    useWorldWeather: boolean;
    initCalled: boolean;
    constructor({ skinObjectOpts, init, useWorldWeather }: {
        skinObjectOpts: SkinObjectOpts;
        init?: boolean;
        useWorldWeather?: boolean;
    });
    destructor(): void;
    init(): Promise<void>;
    waitForInit(): Promise<void>;
    applySkeleton(skeleton: PlayerSkeleton): void;
    setHitFlashMaterialsTime(time: number): void;
    setHitFlashMaterialsValue(index: number, flashTime: number, flashPosition: Vector3): void;
    computeApproximateBoundingSphere(): Sphere;
}
declare class PurchaseConfirmDialog extends Dialog {
    onPurchaseSuccessCbs: Set<() => void>;
    shopItem: ShopItem;
    purchaseButton: CustomButton;
    constructor(gameWrapper: HTMLElement, config: ShopItemConfig, { renderOptions }: {
        renderOptions: ShopItemRenderOptions;
    });
    destructor(): void;
    setButtonEnabled(enabled: boolean): void;
    purchaseButtonClick(): Promise<void>;
    onPurchaseSuccess(cb: () => void): void;
}
declare class SingleAssetLoader {
    obj: Object3D;
    label: string;
    useWorldWeather: boolean;
    currentlyLoadingAbortController: AbortController | null;
    currentAssetName: string;
    currentMeleeAsset: Object3D | null;
    onFirstAssetLoadCbs: Set<() => void>;
    onNewAssetLoadedCbs: Set<() => void>;
    currentlyLoadedMaterials: never[];
    constructor({ useWorldWeather, label }?: {
        label?: string | undefined;
        useWorldWeather?: boolean | undefined;
    });
    destructor(): void;
    setConfig(config: {
        skinAssetName?: string | null;
        fallbackSkinAssetName?: string | null;
        [k: string]: unknown;
    }): Promise<void>;
    destroyMaterials(): void;
    destroyBowMeshes(): void;
    waitForLoad(): Promise<void>;
    get isLoadingAsset(): boolean;
    onNewAssetLoaded(cb: () => void): void;
}
interface BowAssetConfig {
    arrowSkin?: string | null;
    bowId?: string;
    arrowCount?: number;
    skins?: unknown[];
    teamColor?: string;
    teamId?: number;
    separateObjectNames?: string[];
    arrowPositions?: string[];
}
declare class BowAssetLoader {
    obj: Object3D;
    useWorldWeather: boolean;
    lastFireAmount01: number;
    lastVisibleCount: number;
    currentBowAsset: Object3D | null;
    onFirstAssetLoadCbs: Set<() => void>;
    onAssetChangeCbs: Set<(bow: Mesh) => void>;
    currentlyLoadingAbortController: AbortController | null;
    currentlyLoadedMaterials: Material[];
    currentArrowObjs: Object3D[];
    currentArrowOffsets: Vector2[];
    onArrowDestroyCallbacks: Set<() => void>;
    arrowAssetLoader: SingleAssetLoader;
    arrowObjectsConfig: {
        arrowCount: number;
        arrowPositions: string | string[];
    };
    arrowPointIdle: Object3D;
    arrowPointLoaded: Object3D;
    constructor({ useWorldWeather }?: {
        useWorldWeather?: boolean | undefined;
    });
    destructor(): void;
    setConfig(config: BowAssetConfig): Promise<void>;
    rebuildArrowObjects(): void;
    getClonedArrowObject(cb: () => void): Object3D | null;
    destroyMaterials(): void;
    destroyBowMeshes(): void;
    waitForLoad(): Promise<void>;
    onAssetChange(cb: (bow: Mesh) => void): void;
    get isLoadingAsset(): boolean;
    get assetLoaded(): boolean;
    getLoadedArrowPointScale(): Vector3;
    updateFireAmount(fireAmount01: number, visibleCount: number): void;
    internalUpdateFireAmount(): void;
}
export interface StatClassConfig {
    icon: string;
    uiName: string;
    defaultValue: number;
    min: number;
    max: number;
    tooltipCategories: string[];
}
export interface StatClassTooltipOptions {
    zIndex: number;
    statClasses: Record<string, number>;
    aboveRect: DOMRect;
    showTotal?: boolean;
    category?: string;
}
declare class StatClassTooltip {
    el: HTMLDivElement;
    constructor({ zIndex, statClasses, aboveRect, showTotal, category }: StatClassTooltipOptions);
    destructor(): void;
}
export interface ShopItemRenderOptions {
    colorMultiplier: ColorArray;
    gender: PlayerGender;
}
export interface ShopItemOptions {
    configIndex?: number;
    usage?: string;
    renderOptions: ShopItemRenderOptions;
    dialog: Dialog;
    scrollingContainer?: HTMLElement;
}
declare class ShopItem {
    gameWrapper: HTMLElement;
    el: HTMLButtonElement | HTMLDivElement;
    configIndex: number;
    config: ShopItemConfig;
    usage: string;
    renderOptions: ShopItemRenderOptions;
    dialog: Dialog;
    destructed: boolean;
    onSelectedChangeRequestCbs: Set<(selected: boolean) => void>;
    statsTooltip: StatClassTooltip | null;
    onHoveringChangeCbs: Set<(hovering: boolean) => void>;
    selected: boolean;
    owned: boolean;
    isHovering: boolean;
    isLooping: boolean;
    shouldStopLooping: boolean;
    prevNow: number;
    boundAnimationLoop: () => void;
    boundRemoveStatsTooltip: () => void;
    scrollingContainer?: HTMLElement;
    onConfirmPurchaseDialogOpenCbs: Set<(dialog: PurchaseConfirmDialog) => void>;
    renderView: RenderView;
    cam: PerspectiveCamera;
    camTarget: Object3D;
    rotY: number;
    defaultRotY: number;
    scene: Scene;
    skeleton: PlayerSkeleton;
    loadingModelSym: symbol | null;
    loadingModel: SkinModel | null;
    visibleModel: SkinModel | null;
    skinObject: Object3D | null;
    bowAsset: BowAssetLoader | null;
    skinObjectAsset: SingleAssetLoader | null;
    currencyWrapperEl?: HTMLDivElement | null;
    currencyContainer?: CurrencyContainer | null;
    lockEl: HTMLDivElement;
    elementVisible: boolean;
    skinObjectDirty: boolean;
    intersectionObserver: IntersectionObserver;
    constructor(gameWrapper: HTMLElement, config: ShopItemConfig, { configIndex, usage, renderOptions, dialog, scrollingContainer, }: ShopItemOptions);
    get id(): string;
    get requiresPeliEntitlements(): boolean | undefined;
    destructor(): void;
    setRenderOptions(renderOptions: ShopItemRenderOptions): void;
    setDefaultRotY(defaultRotY: number): void;
    reloadSkinObjectNow(): Promise<void>;
    onSelectedChangeRequest(cb: (selected: boolean) => void): void;
    setOwned(owned: boolean): void;
    setIsHovering(hovering: boolean): void;
    startLooping(): void;
    stopLooping(): void;
    animationLoop(): undefined;
    onHoveringChange(cb: (hovering: boolean) => void): void;
    addStatsTooltip(): void;
    removeStatsTooltip(): void;
    setSelectedState(selected: boolean): void;
    updateAriaLabel(): void;
    getSkinSlots(): Generator<string, void, unknown>;
    highlight(): void;
    openConfirmPurchaseDialog(): Promise<void>;
    requestSelectedState(selected: boolean): void;
    onConfirmPurchaseDialogOpen(cb: (dialog: PurchaseConfirmDialog) => void): void;
}
type HighlightShopItemAction = "highlight" | "highlight-and-equip" | "open";
declare class ShopItemsGrid {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    shopItems: Map<string, ShopItem>;
    activeConfirmPurchaseDialogs: Set<PurchaseConfirmDialog>;
    currentHoveringItem: ShopItem | null;
    onHoveringItemChangeCbs: Set<(hoveringItem: ShopItem | null) => void>;
    onSelectedItemChangeRequestCbs: Set<(id: string, selected: boolean) => void>;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    addShopItem(config: ShopItemConfig, options: ShopItemOptions): void;
    closeCreatedConfirmPurchaseDialogs(): void;
    destructShopItems(): void;
    loadShopItems(configs: ShopItemConfig[], opt: Omit<ShopItemOptions, "configIndex">): void;
    setRenderOptions(renderOptions: ShopItemRenderOptions): void;
    setSelectedItems(selectedItems: Set<string>): void;
    setSelectedItemState(shopID: string, selected: boolean): void;
    onSelectedItemChangeRequest(cb: (id: string, selected: boolean) => void): void;
    setPurchasedItems(purchasedItems: Set<string>): void;
    onHoveringItemChange(cb: (hoveringItem: ShopItem | null) => void): void;
    sortShopItems(): void;
    performHighlightShopItemAction(itemID: string, action: HighlightShopItemAction): void;
}
declare class SkinPreview {
    destructed: boolean;
    el: HTMLDivElement;
    currentlyLoadedSkinData: SkinData | null;
    currentTeamId: number;
    tooltipCategory: string;
    statsTooltip: StatClassTooltip | null;
    renderView: RenderView;
    downloadButton: HTMLDivElement;
    cam: PerspectiveCamera;
    camTarget: Object3D;
    rotY: number;
    currentMouseYMultiplier: number;
    scene: Scene;
    modelRotationContainer: Object3D;
    bowParentObj: Object3D;
    meleeParentObj: Object3D;
    smoothCamPosOffset: Vector3;
    smoothCamTargetRot: number;
    activeCamFollowingTarget: Object3D | null;
    activeSlotPositionId: string | null;
    camPositions: Map<string, {
        pos: Vector3;
        rot?: number;
        mouseYMultiplier?: number;
        activeFollowingTarget?: Object3D;
    }>;
    boundOnMouseMove: (event: MouseEvent) => void;
    lastMouseX: number;
    lastMouseY: number;
    skeleton: PlayerSkeleton;
    activeExtraPoseLayer: PoseLayer | null;
    bowAssetLoader: BowAssetLoader;
    hoveringBowAssetLoader: BowAssetLoader;
    bowSkeletonObj: Object3D | null;
    currentVisibleBowId: string | null;
    currentEquippedSkinIds: string[];
    hoveringBowVisible: boolean;
    meleeAssetLoader: SingleAssetLoader;
    hoveringMeleeAssetLoader: SingleAssetLoader;
    meleeSkeletonObj: Object3D | null;
    currentVisibleMeleeSkinAssetName: string | null;
    hoveringMeleeVisible: boolean;
    activeModel: SkinModel | null;
    loadingModel: SkinModel | null;
    hoveringModel: SkinModel | null;
    hoveringModelVisible: boolean;
    lastHoveringModelCacheKey: string;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    initSkeleton(): Promise<void>;
    addModel(t: SkinModel | null): Promise<void>;
    removeModel(t: SkinModel | null): void;
    loop(now: number, dt: number): void;
    setHoveringModel(skinObjectOpts: SkinObjectOpts | null): void;
    setHoveringShopItemId(itemId: string): void;
    setTemporaryColorCategory(colorCategory: string, colorMultiplier: ColorArray): void;
    resetHoveringModel(): void;
    updateVisibleModelAfterHoveringInit(): Promise<void>;
    updateSkinModel(): void;
    setCurrentSkinConfig(skinData: SkinData): void;
    setTooltipCategory(tooltipCategory: string): void;
    updateBackgroundColor(): void;
    replaceLoadingModel(): Promise<void>;
    onMouseMove(event: MouseEvent): void;
    getVisibleModel(): SkinModel | null;
    updateVisibleModel(): void;
    updateVisibleBow(): void;
    updateVisibleMelee(): void;
    updateSkeletonGender(): Promise<void>;
    updateModelRotation(): void;
    setActiveSlotPosition(t: string, e?: boolean): void;
    setSkeletonPose(poseName: string | null): Promise<void>;
    setBow(bowId: string | null): void;
    updateBowConfig(): void;
    setMelee(meleeSkinAssetName: string | null): void;
    updateMeleeConfig(): void;
}
export interface ShopFilterOptions {
    useSingleWeaponType?: string | null;
    hideNonBowSkins?: boolean;
    shopCategoriesFilter?: string[];
    filterType?: string;
}
export interface SkinPreviewOptions {
    skinPreviewCamPosition?: string | null;
    skeletonPose?: string | null;
    bowId?: string | null;
    meleeSkinAssetName?: string | null;
}
export interface GridViewSubPageOptions {
    itemName: string;
    buttonIcon?: string;
    hasPeliPlusIcon?: boolean;
    buttonIconSize?: number;
    filterOptions?: ShopFilterOptions;
    skinPreviewCamPosition?: string | null;
    skeletonPose?: string | null;
    bowId?: string | null;
    meleeSkinAssetName?: string | null;
    colorButtonsCategory?: string;
    previewTooltipCategory?: string;
}
declare class ShopCustomizationView {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    dialog: Dialog;
    skinManager: SkinsManager;
    customizationId: CustomizationId;
    onBackButtonClickCbs: Set<() => void>;
    pagedView: PagedView;
    createdGrids: Map<HTMLElement, {
        grid: ShopItemsGrid;
        reloadFilteredItems: () => void;
        pagedViewStructure: PagedViewStructure;
    }>;
    skinPreview: SkinPreview;
    filterSubPages: Map<string, PagedViewStructure>;
    showHiddenItems: boolean;
    constructor(gameWrapper: HTMLElement, skinManager: SkinsManager, { id, rootHeader, dialog }: CustomizationViewConfig);
    destructor(): void;
    onBackButtonClick(cb: () => void): void;
    closeCreatedDialogs(): void;
    loop(now: number, dt: number): void;
    updateShopState(purchasedItemIds: Set<string>): void;
    highlightOrOpenShopItem(categories: string[], itemId: string, action: HighlightShopItemAction): void;
    resetSkinPreview({ camPosition }?: {
        camPosition?: string | undefined;
    }): void;
    createBowGridViewConfig(weapon: BowConfig, section: string): SkinPreviewOptions & {
        filterOptions: ShopFilterOptions;
    };
    setSkinPreview({ skinPreviewCamPosition, skeletonPose, bowId, meleeSkinAssetName, }: SkinPreviewOptions): void;
    createGridViewSubPage({ itemName, buttonIcon, hasPeliPlusIcon, buttonIconSize, filterOptions, skinPreviewCamPosition, skeletonPose, bowId, meleeSkinAssetName, colorButtonsCategory, previewTooltipCategory, }: GridViewSubPageOptions): PagedViewStructure;
    filterPurchasableItems(items: ShopItemConfig[], gender: PlayerGender, filterOptions?: ShopFilterOptions): ShopItemConfig[];
    getShopItemRenderOptions(colorCategory: string): {
        colorMultiplier: ColorArray;
        gender: PlayerGender;
    };
    createShopItemsGrid(scrollingContainer: HTMLElement, { filterOptions, pagedViewStructure, colorButtonsCategory, }: {
        filterOptions?: ShopFilterOptions;
        pagedViewStructure: PagedViewStructure;
        colorButtonsCategory?: string;
    }): void;
    updateSelectedItemsForClass(classId: string, grid: ShopItemsGrid): void;
    getCurrentSkinData(): SkinData;
    updateSkinPreviewConfig(): void;
    destroyShopItemsGrid(scrollingContainer: HTMLElement): void;
}
interface ClassSelectionImageOptions {
    extraClasses?: string[];
}
declare class ClassSelectionImage {
    classId: string;
    el: HTMLDivElement;
    backgroundEl: HTMLDivElement;
    imageEl: HTMLDivElement;
    seed: number;
    updateReference: ClassImageReference;
    constructor(classId: string, { extraClasses }?: ClassSelectionImageOptions);
    destructor(): void;
    set needsUpdates(value: boolean);
    setCssColor(color: string, borderColor: string): void;
}
declare class ClassSelectionItem {
    el: HTMLDivElement;
    onClickCbs: Set<() => void>;
    classSelectionImage: ClassSelectionImage;
    constructor(weapon: BowConfig);
    set needsAvatarUpdates(value: boolean);
    destructor(): void;
    onClick(cb: () => void): void;
}
interface PresetSelectionItemConfig {
    preset: SkinData;
    onEditButtonClick(): void;
    showDeleteButton: boolean;
    onDeleteButtonClick(): void;
}
declare class PresetSelectionItem {
    el: HTMLDivElement;
    avatarBlobUrlReference: BlobURLReference;
    constructor({ preset, onEditButtonClick, showDeleteButton, onDeleteButtonClick }: PresetSelectionItemConfig);
    destructor(): void;
}
declare class PresetsView {
    skinManager: SkinsManager;
    onPresetOpenClickCbs: Set<(presetIndex: number) => void>;
    onBackButtonClickCbs: Set<() => void>;
    el: HTMLDivElement;
    presetsList: HTMLDivElement;
    createdPresetItems: PresetSelectionItem[];
    addPresetButton: CustomButton;
    constructor(skinManager: SkinsManager);
    destructor(): void;
    updatePresetList(): void;
    onPresetOpenClick(cb: (presetIndex: number) => void): void;
    onBackButtonClick(cb: () => void): void;
}
export type CustomizationId = {
    type: "preset";
    presetId: number;
} | {
    type: "class";
    classId: string;
};
export interface CustomizationViewConfig {
    id: CustomizationId;
    rootHeader: string;
    dialog: Dialog;
}
declare class ShopDialog extends Dialog {
    currentCustomizationView: ShopCustomizationView | null;
    currentPresetsView: PresetsView | null;
    mainViewVisible: boolean;
    ownedCoinsContainer: HTMLDivElement;
    currencyContainer: CurrencyContainer;
    classSelectionContainer: HTMLDivElement;
    presetsButton: CustomButton;
    classSelectionListEl: HTMLDivElement;
    createdClassSelectionItems: ClassSelectionItem[];
    boundUpdateShopState: () => void;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    onClose(): void;
    loop(now: number, dt: number): void;
    updateShopState(): void;
    updateMainViewVisibility(): void;
    showPresetCustomizationView(presetId: number): void;
    showCustomizationView(config: CustomizationViewConfig): void;
    hideCustomizationView(): void;
    showPresetsView(): void;
    hidePresetsView(): void;
    openShopItemSubPage(itemId: string, action: HighlightShopItemAction): void;
    highlightShopItem(itemId: string, action: HighlightShopItemAction): void;
    openShopItem(itemId: string): void;
}
declare class ProfileDialog extends Dialog {
    avatarEl: HTMLDivElement;
    boundChangeAvatarUrl: (url: string | null) => void;
    usernameForm: HTMLFormElement;
    usernameDummyText: HTMLDivElement;
    usernameInput: HTMLInputElement;
    usernameEditButton: HTMLButtonElement;
    boundUpdateProfileState: () => void;
    stats: Map<string, {
        valueEl: HTMLDivElement;
    }>;
    constructor(gameWrapper: HTMLElement, { showExtraStats }: {
        showExtraStats?: boolean;
    });
    destructor(): void;
    updateProfileState(): void;
    submitUsername(): Promise<void>;
    updateUsernameInputVisibility(): void;
    changeAvatarUrl(url: string | null): void;
}
declare class CornerProfile {
    el: HTMLButtonElement;
    clickCbs: Set<(event: MouseEvent) => void>;
    avatarEl: HTMLDivElement;
    usernameEl: HTMLDivElement;
    ownedCoins: CurrencyContainer;
    boundAvatarUrlChanged: (url?: string | null) => void;
    constructor();
    init(): void;
    setUsername(username: string): void;
    onClick(cb: (event: MouseEvent) => void): void;
    setMainMenuVisibility(visible: boolean): void;
    avatarUrlChanged(url?: string | null): void;
}
export interface PromoSeasonalRange {
    startDay?: number;
    endDay?: number;
    startMonth?: number;
    endMonth?: number;
}
export interface PromoItem {
    id?: string;
    image?: string;
    action?: string;
    actionShopItem?: string;
    subscribeFlow?: string;
    seasonalRange?: PromoSeasonalRange | null;
    maxViewCount?: number;
    buttonText?: string;
    buttonIcon?: string;
    hasPeliPlusIcon?: boolean;
    actionOpenUrl?: string;
    actionHighlightMap?: string;
}
export interface PromoViewData {
    id: string;
    viewCount: number;
}
declare class PromoBanner {
    configManager: ConfigManager;
    mainMenu: MainMenu;
    gameManager: GameManager;
    shopStateManager: ShopState;
    pokiManager: Poki;
    dialogManager: DialogManager;
    skinManager: SkinsManager;
    indexedDb: IndexedDB;
    promoViewData: Map<string, PromoViewData>;
    activePromo: PromoItem | null;
    activePromos: PromoItem[];
    el: HTMLDivElement;
    bannerEl: HTMLDivElement;
    button: CustomButton;
    constructor(configManager: ConfigManager, mainMenu: MainMenu, gameManager: GameManager, shopStateManager: ShopState, pokiManager: Poki, dialogManager: DialogManager, skinManager: SkinsManager, indexedDb: IndexedDB);
    init(): Promise<void>;
    loadNewBestPromo(): void;
    loadPromoViewData(): Promise<void>;
    savePromoViewData(): Promise<void>;
    setActivePromo(promo: PromoItem | null): void;
    onPromoClick(): Promise<void>;
    updateVisibility(): void;
    getPromoViewData(id: string): PromoViewData;
    updatePromoViewdata(promoId: string, update: (viewData: PromoViewData) => PromoViewData | void): void;
}
export interface TextInputOptions {
    value?: string;
    placeholder?: string;
    extraClasses?: string[];
    onInput?: (() => void) | null;
    spellCheck?: boolean;
    maxLength?: number | null;
}
declare class TextInput {
    el: HTMLInputElement;
    constructor({ value, placeholder, extraClasses, onInput, spellCheck, maxLength, }?: TextInputOptions);
    get value(): string;
    set value(newValue: string);
}
declare class SquadSettingsDialog extends Dialog {
    squadManager: SquadManager;
    settings: Map<string, Setting<SettingValue, SettingOptions>>;
    privateSquadOnlySettings: Set<Setting<SettingValue, SettingOptions>>;
    privateSquadSetting: Setting<SettingValue, {
        text: string;
        type: "toggle";
    }>;
    leaderOnlyMessage: HTMLDivElement;
    constructor(gameWrapper: HTMLElement, squadManager: SquadManager);
    destructor(): void;
    onSquadSettingChange: (name: string, value: SettingValue) => void;
    onMySquadLeaderStateChange: () => void;
    updateLeaderMessageVisibility(): void;
    updateDisabledState(): void;
}
declare class Timeout {
    cb: () => void;
    ms: number;
    id: number;
    isDestructed: boolean;
    constructor(cb: () => void, ms: number, startNow?: boolean);
    destructor(): void;
    get isRunning(): boolean;
    stop(): boolean | undefined;
    start(time?: number): void;
    execute(): void;
    static promise(timeout: number): Promise<void>;
}
declare class SpringValue {
    value: number;
    target: number;
    velocity: number;
    springMultiplier: number;
    maxSpring: number;
    dampening: number;
    loopValue: boolean;
    loopStart: number;
    loopEnd: number;
    constructor({ startValue, springMultiplier, maxSpring, dampening, loopValue, loopStart, loopEnd, }?: {
        dampening?: number | undefined;
        loopEnd?: number | undefined;
        loopStart?: number | undefined;
        loopValue?: boolean | undefined;
        maxSpring?: number | undefined;
        springMultiplier?: number | undefined;
        startValue?: number | undefined;
    });
    loop(now: number, dt: number): void;
    performValueLoop(value: number): number;
}
declare class SpringVector3 {
    xValue: SpringValue;
    yValue: SpringValue;
    zValue: SpringValue;
    constructor({ startValue, springMultiplier, maxSpring, dampening, }?: {
        dampening?: number | undefined;
        maxSpring?: number | undefined;
        springMultiplier?: number | undefined;
        startValue?: Vector3 | undefined;
    });
    loop(now: number, dt: number): void;
    get value(): Vector3;
    set value(value: Vector3);
    get target(): Vector3;
    set target(t: Vector3);
    addImpulse(impulse: Vector3): void;
}
export interface FirstPersonConfig {
    posOffset: Vector3;
    rotOffset: Vector3;
    posFovMultiplierX: number;
    posFovMultiplierY: number;
    posBaseFovMultiplierX: number;
    walkBobMultiplier: number;
    valuesSmoothing: number;
    pitchHeightMultiplier: number;
    minFov: number;
    maxFov: number;
}
export interface HoldingHandlerOptions {
    holdingObject: Object3D;
    thirdPersonParentName: string;
    secondaryThirdPersonParentName?: string | null;
    firstPersonConfig?: Partial<FirstPersonConfig>;
}
declare class HoldingHandler {
    player: Player;
    holdingObject: Object3D;
    usePrimaryParent: boolean;
    thirdPersonParentName: string;
    secondaryThirdPersonParentName: string | null;
    firstPersonPosOffset: Vector3;
    firstPersonRotOffset: Quaternion;
    smoothFirstPersonPosOffset: Vector3;
    smoothFirstPersonRotOffset: Quaternion;
    smoothFirstPersonPosFovMultiplierX: number;
    smoothFirstPersonPosBaseFovMultiplierX: number;
    smoothFirstPersonPosFovMultiplierY: number;
    smoothFirstPersonWalkBobMultiplier: number;
    smoothFirstPersonPitchHeightMultiplier: number;
    smoothFirstPersonMinFov: number;
    smoothFirstPersonMaxFov: number;
    prevCamPosValid: boolean;
    prevCamRotValid: boolean;
    prevCamPos: Vector3;
    prevCamRotForwardVector: Vector3;
    camPosOffsetPhysics: SpringVector3;
    camRotOffsetPhysics: SpringValue;
    renderOverlay: RenderOverlay;
    firstPersonObjContainer: Object3D;
    linkedThirdPersonObject: Object3D | null;
    firstPersonConfig: FirstPersonConfig;
    constructor(player: Player, { holdingObject, thirdPersonParentName, secondaryThirdPersonParentName, firstPersonConfig, }: HoldingHandlerOptions);
    destructor(): void;
    updateRenderOverlayEnabled(): void;
    setUsePrimaryParent(usePrimary: boolean): void;
    updateParent(): void;
    loop(now: number, dt: number): void;
    setFirstPersonConfig(config: Partial<FirstPersonConfig>, applyImmediately?: boolean): void;
    updateFirstPersonPosition(): void;
    updateRenderOverlayFovs(): void;
    useFirstPersonUpdated(): void;
    playerObjectChanged(): void;
    addFirstPersonImpulse(impulse: Vector3): void;
    firstPersonMoveDown(): void;
}
export interface RayCastHit {
    dist: number;
    pos: Vector3;
    collider: Collider & ColliderBase;
}
declare class Collider {
    rigidBody: PlayerBody;
    radius: number;
    heightOffset: number;
    bodyPart: string;
    arrowDamage: number;
    constructor(rigidBody: PlayerBody, radius: number, heightOffset: number, bodyPart: string, arrowDamage: number);
    get center(): Vector3;
    rayCast(from: Vector3, dir: Vector3): RayCastHit | null;
}
export interface SphereManifold {
    colliderType: string;
    pos: Vector3;
    isAtEdge?: boolean;
    isAtUpFace?: boolean;
    isAtSecondUpFace?: boolean;
    normal: Vector3;
    penetration: number;
}
interface ColliderOptions {
    ignoreArrows?: boolean | undefined;
    isLadder?: boolean | undefined;
    isLadderAllSides?: boolean | undefined;
    excludeTeamId?: number | undefined;
    excludeWearingShopItems?: never[] | undefined;
    isDeathTrigger?: boolean | undefined;
    shootSfx?: string | undefined;
    allowJump?: boolean | undefined;
    allowWalk?: boolean | undefined;
    movePlayerUp?: boolean | undefined;
    slippery?: boolean | undefined;
    slowDownPlayerAmount?: number | undefined;
    airFrictionModifier?: number | undefined;
    touchDamageAmount?: number | undefined;
    touchDamageDistance?: number | undefined;
    triggerHingeId?: number | undefined;
    triggerAppearingObjectId?: number | undefined;
}
declare class ColliderBase {
    invWorldMatrix: Matrix4;
    invWorldMatrixNoTranslate: Matrix4;
    worldMatrix: Matrix4;
    aabb: Box3 | null;
    ignoreArrows: boolean;
    isLadder: boolean;
    isLadderAllSides: boolean;
    isDeathTrigger: boolean;
    shootSfx: string;
    allowJump: boolean;
    allowWalk: boolean;
    movePlayerUp: boolean;
    slippery: boolean;
    slowDownPlayerAmount: number;
    airFrictionModifier: number;
    touchDamageAmount: number;
    touchDamageDistance: number;
    triggerHingeId: number;
    triggerAppearingObjectId: number;
    excludeTeamId: number;
    excludeWearingShopItems: never[];
    constructor(worldMatrix: Matrix4, { ignoreArrows, isLadder, isLadderAllSides, excludeTeamId, excludeWearingShopItems, isDeathTrigger, shootSfx, allowJump, allowWalk, movePlayerUp, slippery, slowDownPlayerAmount, airFrictionModifier, touchDamageAmount, touchDamageDistance, triggerHingeId, triggerAppearingObjectId, }: ColliderOptions);
    rayCast(from: Vector3, dir: Vector3): RayCastHit | null;
    getSphereManifold(t: Vector3, e: number): SphereManifold;
    isTriggerCollider(): boolean;
}
interface Face {
    face: number;
    normal: Vector3;
    dot: number;
}
declare class BoxCollider extends ColliderBase {
    box: Box3;
    aabb: Box3;
    cachedUpFaces: Face[] | null;
    constructor(...t: [worldMatrix: Matrix4, opts: ColliderOptions]);
    getSphereManifold(t: Vector3, e: number): SphereManifold;
    getUpFaces(): Face[];
    getIsOnFace(pos: Vector3, face: Face): boolean;
    rayCast(from: Vector3, dir: Vector3): RayCastHit | null;
}
declare class RigidBody {
    enabled: boolean;
    constructor();
    beginPhysicsSteps(): void;
    stepVelocity(step: number): void;
    resolveMapCollisionsOctree(step: number): void;
    endPhysicsSteps(): void;
}
export interface ManifoldEntry {
    manifold: SphereManifold;
    mapCollider: ColliderBase | null;
    playerCollider: Collider & {
        center: Vector3;
        radius: number;
    };
}
declare class PlayerBody extends RigidBody {
    physicsManager: PhysicsManager;
    player: Player;
    pos: Vector3;
    velocity: Vector3;
    totalForce: Vector3;
    colliders: Collider[];
    aabb: Box3;
    gravity: Vector3;
    prevLastFloorTouchTime: number;
    lastLandTime: number;
    lastFloorTouchTime: number;
    lastJumpableColliderTouchTime: number;
    isOnFloor: boolean;
    isOnJumpableCollider: boolean;
    isOnUnwalkableCollider: boolean;
    lastJumpTime: number;
    inAirAfterJump: boolean;
    climbingLadder: ColliderBase | null;
    climbingLadderNormal: Vector3 | null;
    isTouchingDamageCollider: boolean;
    lastTouchDamageColliderPosition: Vector3 | null;
    lastTouchDamageColliderTime: number;
    wasOnFloorLastFrame: boolean;
    isOnSlipperyCollider: boolean;
    slowDownColliderAmount: number;
    airFrictionModifier: number;
    fly: boolean;
    noclip: boolean;
    constructor(physicsManager: PhysicsManager, player: Player);
    beginPhysicsSteps(): void;
    stepVelocity(step: number): void;
    updateLastFloorTouchTime(): void;
    endPhysicsSteps(): void;
    get inAirTime(): number;
    get prevInAirTime(): number;
    get onFloorTime(): number;
    get onJumpableColliderTime(): number;
    getCurrentPlayerAabb(): Box3;
    getIntersectingOctreeNodes(): Set<OctreeNode>;
    getPlayerManifolds(t: boolean, e: boolean): ManifoldEntry[];
    getManifoldsHelper(t: Box3, e: Array<Collider & {
        center: Vector3;
        radius: number;
    }>, i: boolean, s: boolean): ManifoldEntry[];
    isAboveJumpableCollider(): boolean;
    manifoldShouldMovePlayerUp(t: SphereManifold, e: number): boolean;
    resolveMapCollisionsOctree(step: number): void;
    needsLadderPhysics(t: SphereManifold, e: BoxCollider): boolean;
    applyForce(t: Vector3): void;
    getAllowJump(): boolean;
    jump(force: number): void;
}
declare class AntiCheat {
    reportedPlayerTimes: Map<number, number>;
    onPlayerNeedsReportCbs: Set<(playerId: number, reportType: number, value: number) => void>;
    constructor();
    reportPlayer(playerId: number, reportType: number, value: number): void;
    onPlayerNeedsReport(cb: (playerId: number, reportType: number, value: number) => void): void;
}
export interface SkeletonLayerWeight {
    name: string;
    weight: number;
}
declare class HoldingHandlerManager {
    holdingHandler: HoldingHandler;
    upConfig: Partial<FirstPersonConfig>;
    downConfig: Partial<FirstPersonConfig>;
    offscreenConfig: Partial<FirstPersonConfig>;
    minDownVelocity: number;
    forcedConfig: Partial<FirstPersonConfig> | null;
    prevUsePrimaryPosition: boolean;
    usePrimaryPosition: boolean;
    holdingHandlerDown: boolean;
    constructor(holdingHandler: HoldingHandler, { upConfig, downConfig, offscreenConfig, minDownVelocity, }: WeaponHolderOptions["holdingHandlerManagerOptions"]);
    setUsePrimaryPosition(usePrimary: boolean): void;
    loop(isUp: boolean, player: Player, { forceDown, forceConfig, }?: {
        forceDown?: boolean;
        forceConfig?: Partial<FirstPersonConfig> | null;
    }): void;
    updateHoldingHandler(applyImmediately?: boolean): void;
}
export interface WeaponActionOptions {
    fromTouchButton?: boolean;
}
export interface WeaponHolderOptions {
    thirdPersonParentName: string;
    secondaryThirdPersonParentName?: string | null;
    holdingHandlerManagerOptions: {
        upConfig: Partial<FirstPersonConfig>;
        downConfig: Partial<FirstPersonConfig>;
        offscreenConfig?: Partial<FirstPersonConfig>;
        minDownVelocity?: number;
    };
}
declare class WeaponBase {
    player: Player;
    actionIsDown: boolean;
    rawActionIsDown: boolean;
    firstPersonVisible: boolean;
    isPrimaryWeapon: boolean;
    equipSfxName: string;
    holdingHandler: HoldingHandler;
    holdingHandlerManager: HoldingHandlerManager;
    constructor(player: Player, holdingObject: Object3D, options: WeaponHolderOptions);
    destructor(): void;
    playerSkinUpdated(): void;
    actionDown(options?: WeaponActionOptions | null): void;
    actionUp(options?: WeaponActionOptions | null): void;
    onActionDown(_options: WeaponActionOptions): void;
    onActionUp(_options: WeaponActionOptions): void;
    onPlayerDied(): void;
    onPlayerRespawned(): void;
    getToggleCooldownValue(): number;
    setFirstPersonVisibility(visible: boolean): void;
    setIsPrimaryWeapon(isPrimary: boolean): void;
    updatePrimaryPosition(): void;
    playSfx(sfxName: string, sfxOptions?: Record<string, unknown>): void;
    loop(_now: number, _dt: number): void;
    adjustFov(fov: number): number;
    getWalkSpeedMultiplier(): number;
    getAdditionalWalkAcceleration(): Vector2 | null;
    getAdditionalWalkAcceleration3d(): Vector3 | null;
    getAdditionalWalkAccelerationClampLength(): number;
    getLookInputMultiplier(): number;
    getJumpForceMultiplier(): number;
    getThirdPersonSkeletonLayers(): SkeletonLayerWeight[];
    getThirdPersonSkeletonMultipliers(_gender: PlayerGender): Record<string, number>;
}
declare class BowWeapon extends WeaponBase {
    bowWeaponId: number;
    bowWeaponTypeId: string;
    equipSfxName: string;
    bowAssetLoader: BowAssetLoader;
    constructor(player: Player, bowWeaponId: number, bowWeaponTypeId: string, opts: WeaponHolderOptions);
    destructor(): void;
    getAutoShootEnabled(): SettingValue | undefined;
    actionDown(t?: {
        fromTouchButton?: boolean;
    } | null): void;
    actionUp(t?: {
        fromTouchButton?: boolean;
    } | null): void;
    shootArrow(fireAmount01: number): void;
    verifyArrowFrequency(frequency: number): boolean;
    getArrowOpts(fireAmount01: number): Partial<ArrowWeaponOpts>;
    loop(now: number, dt: number): void;
    getAutoShootActionUp(): boolean;
    getAccuracyOffset(): number;
    getWalkAccuracyMultiplier(): number;
    getClonedArrowObject(cb: () => void): Object3D | null;
    getLoadSpeed(start: number, end: number): number;
}
declare class MeleeWeapon extends WeaponBase {
    #private;
    get lastSkinAssetName(): string | null;
    equipSfxName: string;
    hitSfxName: string;
    swingSfxName: string;
    hitSfxOptions: SfxOpts | null;
    meleeAssetLoader: SingleAssetLoader;
    constructor(player: Player, options: WeaponHolderOptions);
    destructor(): void;
    getRequiredHorizontalAngleMultiplier(): number;
    getRequiredVerticalAngleMultiplier(): number;
    attack(): boolean;
    playHitSfx(): void;
    validateHit(target: Player): boolean;
    ownedPlayerAttacked(player: Player): void;
    getDamageMultiplier(): number;
    getStunData(): {
        amount: number;
        duration: number;
        fadeDuration: number;
    };
    getRangeMultiplier(): number;
    getAttackSpeedStat(): number;
    updateMeleeAsset(skinAssetName: string): void;
}
export declare class ChargedAttack {
    weapon: MeleeWeapon;
    prepareDurationMsLowAttackSpeed: number;
    prepareDurationMsHighAttackSpeed: number;
    cooldownDurationMsLowAttackSpeed: number;
    cooldownDurationMsHighAttackSpeed: number;
    actionIsDown: boolean;
    attackTime: number;
    isPreparingAttack: boolean;
    cooldownIsActive: boolean;
    constructor({ weapon, prepareDurationMsLowAttackSpeed, prepareDurationMsHighAttackSpeed, cooldownDurationMsLowAttackSpeed, cooldownDurationMsHighAttackSpeed, }: {
        weapon: MeleeWeapon;
        prepareDurationMsLowAttackSpeed: number;
        prepareDurationMsHighAttackSpeed: number;
        cooldownDurationMsLowAttackSpeed: number;
        cooldownDurationMsHighAttackSpeed: number;
    });
    onActionDown(): void;
    onActionUp(): void;
    get timeSinceAttack(): number;
    loop(t: number, i: number, s: number): {
        preparing: boolean;
        cooldownActive: boolean;
    };
}
interface WeaponSelectionItemOptions {
    classId: string;
    keyNumber: number;
}
declare class WeaponSelectionItem {
    keyNumber: number;
    el: HTMLDivElement;
    classSelectionImage: ClassSelectionImage;
    _selected: boolean;
    keyEl: HTMLDivElement;
    onClickCbs: Set<() => void>;
    constructor({ classId, keyNumber }: WeaponSelectionItemOptions);
    get selected(): boolean;
    set selected(value: boolean);
    set needsAvatarUpdates(value: boolean);
    onClick(cb: () => void): void;
    setCssColor(color: string, borderColor: string): void;
}
declare class WeaponSelectionDialog extends Dialog {
    playerVisibility: boolean;
    selectionItemsContainer: HTMLDivElement;
    weaponSelectionItems: WeaponSelectionItem[];
    boundPrevPress: () => boolean;
    boundNextPress: () => boolean;
    prevKey: InputKey;
    nextKey: InputKey;
    boundKeyDown: (e: KeyboardEvent) => void;
    boundUpdateSelectedUi: () => void;
    boundUpdateVisible: () => void;
    mainMenuVisibility?: boolean;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    updateSelectedUi(): void;
    updateNeedsAvatarUpdates(): void;
    setCssColor(color: string, borderColor: string): void;
    onKeyDown(e: KeyboardEvent): void;
    selectWeapon(idx: number): boolean;
    deltaSelectWeapon(delta: number): boolean;
    setPlayerVisibility(playerVisibility: boolean): void;
    setMainMenuVisibility(mainMenuVisibility: boolean): void;
    updateVisible(): void;
}
export interface PlayerParams {
    teamId: number;
    needsPlayerModel: boolean;
    needsSkeleton: boolean;
    isDummyPlayer: boolean;
}
interface Stun {
    amount: number;
    duration: number;
    fadeDuration: number;
}
interface StunEvent {
    time: number;
    stun: Stun;
}
interface PlayerScoreData {
    scores: {
        flags: number;
        kills: number;
        deaths: number;
        total: number;
    };
    elo: number;
}
export declare class Player {
    #private;
    game: OnlineGame | OfflineGame;
    inputManager: InputManager;
    sfxManager: SoundFX;
    physicsManager: PhysicsManager;
    settingsManager: SettingsManager;
    hudIconsManager: HudIcons;
    id: number;
    hasOwnership: boolean;
    creationTime: number;
    teamId: number;
    isDummyPlayer: boolean;
    equippedSkinData: SkinData;
    isSameSquadPlayer: boolean;
    isSquadLeader: boolean;
    iconOwnershipVisibility: boolean;
    squadPlayerId: number;
    gender: string;
    walkSpeed: number;
    recentStunEvents: Set<StunEvent>;
    airWalkSpeedMultiplier: number;
    flagWalkSpeed: number;
    jumpForce: number;
    ladderClimbSpeed: number;
    ladderTangentWalkSpeed: number;
    playerHasInteracted: boolean;
    onPlayerHasInteractedChangeCbs: Set<() => void>;
    lastHitTime: number;
    damageReceivedHistory: {
        damage: number;
        time: number;
        appliedDamage: number;
    }[];
    currentHealthRegenSfx: SFXSound | null;
    nonActiveWeaponsEffect: number;
    old2dWalkAccelerationEffect: number;
    playerName: string;
    playerNameVerified: boolean;
    scoreFlags: number;
    scoreKills: number;
    scoreDeaths: number;
    scoreTotal: number;
    elo: number;
    serverPos: Vector3;
    hasValidPosition: boolean;
    recentForcedServerPositions: Set<{
        pos: Vector3;
        time: number;
    }>;
    lastReceivedServerPosTime: number;
    maxPredictedServerPosDistance: number;
    predictedServerPos: Vector3;
    lastPredictedServerVelocity: Vector3;
    predictedServerVelocity: Vector3;
    predictedServerAcceleration: Vector3;
    serverPosSmooth: Vector3;
    velocity: Vector3;
    networkPosIsMovingUp: boolean;
    antiFlyAccumulator: number;
    antiFlyInAirTimeRaw: number;
    antiFlyInAirTimeAccumulator: number;
    lastAntiFlyRaycastTime: number;
    lastAntiFlyRaycastDist: number;
    lastReceivedActionTime: number;
    pos: Vector3;
    negativeHealthStartTime: number;
    prevHealthIsNegative: boolean;
    negativeHealthCounter: number;
    cachedCamPos: Vector3;
    cachedCamPosDirty: boolean;
    cachedCamRot: Quaternion;
    cachedCamRotDirty: boolean;
    lookRot: Vector2;
    deadLookRot: Vector2;
    frontThirdPersonLookRot: Vector2;
    smoothLookRotTarget: Vector2;
    noSentDataChangeUpdateCount: number;
    lastSentPos: Vector3;
    lastSentRot: Vector2;
    lastPosSentTime: number;
    prevPos: Vector3;
    smoothMovementSpeed: number;
    ping: number;
    positionHistory: Vector3[];
    rigidBody: PlayerBody;
    boundOnJumpPress: () => void;
    boundOnFireDown: () => void;
    boundOnFireUp: () => void;
    boundToggleActiveWeapon: () => void;
    boundOnThirdPersonChange: () => void;
    boundUpdateToggleWeaponTouchButtonVisibility: () => void;
    boundSetHasSmoothCam: (value: SettingValue) => void;
    boundUpdateSmoothCam: () => void;
    boundUpdateActiveWeapon: () => void;
    boundUpdateFly: () => void;
    boundOnWheel: (event: WheelEvent) => void;
    lastAirJumpPressTime: number;
    prevWasOnFloor: boolean;
    hasTouchedFloorEver: boolean;
    lastJumpTime: number;
    lastJumpLandTime: number;
    lastJumpLandAmount: number;
    highestInAirPoint: number;
    currentFallingSfx: SFXSound | null;
    hasKeyEvents: boolean;
    useFirstPersonHoldingHandlers: boolean;
    noclip: boolean;
    serverFlyEnabled: boolean;
    flySpeed: number;
    movementAccuracyOffset: AccuracyOffset | null;
    holdingFlag: Flag | null;
    sentChangeFlagMessages: {
        flagId: number;
        changeOperation: number;
        sendTime: number;
    }[];
    statClassValues: Map<string, number> | null;
    holdingHandlers: Set<HoldingHandler>;
    needsPlayerModel: boolean;
    loadingModel: SkinModel | null;
    activeModel: SkinModel | null;
    skeleton: PlayerSkeleton | null;
    mostRecentWeaponSkeletonLayers: {
        name: string;
        weight: number;
    }[];
    weaponActionIsDown: boolean;
    bowWeapon: BowWeapon | null;
    meleeWeapon: MeleeWeapon | null;
    meleeWeaponId: string | null;
    hasActiveMeleeWeapon: boolean;
    lastActiveWeaponToggleTime: number;
    didUpdateActiveWeaponAfterToggle: boolean;
    recentlyDestroyedWeapons: Map<number, number>;
    lastSentArrowId: number;
    weaponAccuracyOffset: AccuracyOffset | null;
    gungameWeaponIndex: number;
    allowedWeaponsConfig: {
        allowMelee: boolean;
        availableBowIds: number[];
    };
    lastWeaponLayersKey: string;
    weaponLayers: PoseLayer[];
    recentInvalidArrowTimes: number[];
    recentArrowCreationTimes: number[];
    dead: boolean;
    currentSpawnId: number;
    dieTime: number;
    deadAnimationWeight: number;
    deadFallForward: boolean;
    deadFromFall: boolean;
    sphereDeathTimer: number;
    sphereDeathScreenFlash: ScreenFlash | undefined;
    hasWalkedAwayFromSpawn: boolean;
    lastRespawnPosition: Vector3;
    onWeaponSelectionChangeFromDialog: () => void;
    onSkinConfigChange: () => void;
    skinLegMoveAmount: number;
    smoothCamSetting: boolean;
    smoothCamDebug: boolean;
    smoothCam: boolean;
    nextHitFlashIndex: number;
    obj: Object3D | null;
    legsMoveT: number;
    legsMoveAmount: number;
    walkHeadBobAmount: number;
    legsMoveSpeed: number;
    lastSfxStep: number;
    icon: HudIcon;
    destructed: boolean;
    equippingWeaponLayer: PoseLayer | null;
    deadForwardLayer: PoseLayer | null;
    deadBackwardLayer: PoseLayer | null;
    constructor(game: OnlineGame | OfflineGame, inputManager: InputManager, sfxManager: SoundFX, physicsManager: PhysicsManager, settingsManager: SettingsManager, hudIconsManager: HudIcons, id: number, { teamId, needsPlayerModel, needsSkeleton, isDummyPlayer, }?: Partial<PlayerParams>);
    init(): void;
    set health(t: number);
    get health(): number;
    ownedPlayerDidBluntHeavyHit(): void;
    waitForSkeletonLoad(): Promise<void>;
    destructor(): void;
    get sameSquadOrOwned(): boolean;
    removeActiveBowWeapon(): void;
    removeActiveMeleeWeapon(): void;
    setActiveBowWeapon(bowIndex: number, forceReload?: boolean): void;
    updateActiveMeleeWeapon(): void;
    setActiveMeleeWeapon(meleeId: string | null): void;
    updateToggleWeaponTouchButtonVisibility(): void;
    get currentToggleWeaponCooldown(): number;
    get activeWeaponToggleCooldownActive(): boolean;
    get activeWeapon(): BowWeapon | MeleeWeapon | null;
    getEquippedWeapons(): Generator<BowWeapon | MeleeWeapon, void, unknown>;
    getSelectedWeapon(): number;
    updateMySelectedWeapon(t?: boolean): void;
    sendMyEquippedSkinData(): void;
    getSendArrowId(): number;
    getClonedArrowObject(onDestroy: () => void): Object3D | null;
    loop(nowMs: number, deltaMs: number): void;
    get legsMoveTForCos(): number;
    afterPhysicsLoop(now: number, dt: number): void;
    animateLeg(t: {
        upper: Object3D;
        lower: Object3D;
        foot: Object3D;
    } | null, i: number, s: number, n: number, o: number): void;
    createHoldingHandler(t: HoldingHandlerOptions): HoldingHandler;
    removeHoldingHandler(t: HoldingHandler): void;
    getSfxPos(): Vector3 | null;
    startFallSound(): Promise<void>;
    stopFallSound(): void;
    startHealthRegenSound(): Promise<void>;
    stopHealthRegenSound(): void;
    sendPlayerDataToServer(): void;
    static get PlayerAction(): {
        JUMP: number;
        FIRE_DOWN: number;
        FIRE_UP: number;
        SPAWN: number;
        DIE: number;
    };
    sendPerformAction(action: number): void;
    receivedPerformAction(action: number): void;
    receiveChangeClassFromServer(bowIndex: number): void;
    setHasOwnership(hasOwnership: boolean): void;
    setPlayerName(playerName: string): void;
    setNamePlayerVerified(): void;
    setTeamId(teamId: number): void;
    setIsSameSquadPlayer(isSameSquad: boolean, squadPlayerId: number, isLeader: boolean): void;
    setScores({ scores, elo, }: PlayerScoreData): void;
    setHasEvents(hasKeyEvents: boolean): void;
    setHasSmoothCam(value: SettingValue): void;
    updateSmoothCam(): void;
    resetSmoothLookRot(): void;
    setHasMovementAccuracyOffset(hasMovementAccuracyOffset: boolean): void;
    getStatClassValue(statName: string): number;
    reloadPlayerModel(): void;
    updateSkinStats(): void;
    setPlayerEquippedSkinData(skinData: SkinData): void;
    replaceLoadingModel(): Promise<void>;
    setWeaponSelectionDialogVisibility(t: boolean): void;
    updateModelVisibility(): void;
    updateUseFirstPersonHoldingHandlers(): void;
    onJumpPress(): void;
    jump(): void;
    onFireDown(options?: WeaponActionOptions | null): void;
    onFireUp(): void;
    startToggleActiveWeaponCooldown(): void;
    updateAllowedWeaponsConfig(): void;
    setGungameWeaponIndex(weaponIndex: number): void;
    toggleActiveWeapon(): void;
    receiveChangeWeaponTypeFromServer(hasActiveMeleeWeapon: boolean): void;
    updateActiveWeapon(): void;
    setServerFlyEnabled(enabled: boolean): void;
    updateFly(): void;
    onWheel(e: WheelEvent): void;
    onThirdPersonChange(): void;
    addHitFlash(hitColliderID: number): void;
    addMeleeHitFlash(): void;
    playerClaimedHitByArrow(player: Player, arrowID: number, colliderID: number): void;
    markValidArrowHit(player: Player, e: Arrow, collider: Collider): void;
    serverArrowCreated(): void;
    get avgArrowCreationFrequency(): number;
    getMeleeDamage(attacker: Player): number;
    hitByMeleeFromServer(attacker: Player): void;
    addOwnedPlayerForkDamage(t: number): void;
    hitByArrowFromServer(attacker: Player): void;
    verifiedKillByServer(attacker: Player): void;
    applyStun(stun: Stun): void;
    getDamageAmountForCurrentArmor(t: number): {
        damageWithoutArmorStrength: number;
        damageWithArmorStrength: number;
    };
    applyDamage(damage: number, arrowHit: Vector3 | null, cause: string): boolean;
    computeDamageWithCooldown(t: number): number;
    forceSetHealthFromServer(health: number): void;
    setHealthFromHit(health: number, arrowHitNormalWorld: Vector3 | null, vignetteAmount: number, s?: number): void;
    getCamPos(): Vector3;
    getCamRot(): Quaternion;
    getFrontThirdPersonCamRot(): Quaternion;
    computeCamRot(lookRot: Vector2): Quaternion;
    getCamXRotQuaternion(): Quaternion;
    getFlatWalkDirection(): Vector3;
    getShootDirection(): Vector3;
    setServerData(x: number, y: number, z: number, rotX: number, rotY: number, setback?: boolean): void;
    setPingData(t: number): void;
    getDeltaPositionMsAgo(e: number): Vector3;
    updateIconOwnershipVisibility(myTeamId?: number): void;
    updateIconVisibility(): void;
    getSmallAvatar(): Avatar;
    touchedDamageCollider(damage: number): void;
    dieFromFall(): void;
    die(respawn?: boolean): void;
    respawn(key: number): void;
    receivedSpawn(spawnId: number, key: number): void;
    resetDeadPoseWeights(): void;
    onPlayerHasInteractedChange(cb: () => void): void;
    setPlayerHasInteracted(): void;
    getLookDirection(): Vector3;
    computeDeadFallDirection(): boolean;
    updateHealthUi(t?: number): void;
    setPosition(pos: Vector3): void;
    sendChangeFlag(flagId: number, changeOperation: number, record?: boolean): void;
    changeFlagFromServer(flag: Flag, operation: number): void;
    stopHoldingFlag(flag: Flag | null): void;
    removeChangeFlagFromQueue(flagId: number, changeOperation: number): undefined;
    updateEliminationScoreboard(): void;
    report(t: number, severity: number): void;
}
declare class FlagBody extends RigidBody {
    physicsManager: PhysicsManager;
    flag: Flag;
    pos: Vector3;
    velocity: Vector3;
    isOnFloor: boolean;
    radius: number;
    aabb: Box3;
    constructor(physicsManager: PhysicsManager, flag: Flag);
    stepVelocity(step: number): void;
    resolveMapCollisionsOctree(step: number): void;
    getColliderAabb(): Box3;
    getManifolds(): {
        manifold: SphereManifold;
        mapCollider: ColliderBase;
    }[];
}
declare class Flag {
    #private;
    id: number;
    teamId: number;
    game: OnlineGame;
    physicsManager: PhysicsManager;
    defaultPosition: Vector3;
    defaultRotation: Quaternion;
    position: Vector3;
    isOnDefaultPos: boolean;
    rigidBody: FlagBody;
    obj: Object3D;
    grabAnimationContainer: Object3D;
    grabStartTime: number;
    returnProgress: number;
    onNearDefaultPosChangeCbs: Set<unknown>;
    isNearDefaultPos: boolean;
    onCurrentHoldingPlayerChangeCbs: Set<unknown>;
    currentHoldingPlayer: Player | null;
    prevIsBeingHeld: boolean;
    holdingHandler: HoldingHandler | null;
    icon: HudIcon;
    destructed: boolean;
    constructor(id: number, teamId: number, position: Vector3, rotation: Quaternion, game: OnlineGame, physicsManager: PhysicsManager);
    destructor(): void;
    initModel(): Promise<void>;
    updateRenderState(): void;
    updateRenderPosition(): void;
    loop(now: number, dt: number): void;
    afterPhysicsLoop(t: number, e: number): void;
    startHoldByPlayer(t: Player): void;
    destroyHoldingHandler(): void;
    returnToDefaultPos(): void;
    returnToDefaultPosFromFall(): void;
    get heldCountSinceLastReturn(): number;
    removeCurrentHoldingPlayer(): void;
    onCurrentHoldingPlayerChange(t: () => void): void;
    setDroppedPosition(t: number, e: number, i: number, s: number, n: number, o: number): void;
    onNearDefaultPosChange(t: () => void): void;
    updateIsNearDefaultPos(): void;
    sendFlagReturnProgressToServer(selfPos: Vector3): void;
    addReturnProgress(extraProgress: number): void;
    droppedByOwner(): void;
}
export interface ArrowWeaponOpts {
    visualOffset: Vector3;
    scale: Vector3;
    damageMultiplier: number;
    travelDistanceMultiplier: number;
    trailThicknessMultiplier: number;
    trailDurationMultiplier: number;
}
export interface ArrowSpawnOptions {
    arrowId: number;
    pos: Vector3;
    networkOffsetPos: Vector3;
    dir: Vector3;
    fireAmount01: number;
}
export interface ArrowManagerOptions {
    arrowManager: ArrowManager;
    scene: Scene;
}
export interface CachedArrowRay {
    ray: RayCastCache;
    createTime: number;
}
declare class Arrow {
    #private;
    physics: PhysicsManager;
    hingeManager: HingeManager;
    shotBy: Player;
    arrowId: number;
    startPos: Vector3;
    consumed: boolean;
    arrowManager: ArrowManager;
    scene: Scene;
    networkOffsetPos: Vector3;
    networkStartPos: Vector3;
    dir: Vector3;
    arrowWeaponOpts: ArrowWeaponOpts;
    playerDamageMultiplier: number;
    strength: number;
    existingTime: number;
    parabolaXDist: number;
    xSpeed: number;
    visualStartPos: Vector3;
    obj: Object3D;
    prevPos: Vector3 | null;
    prevRaycastPos: Vector3 | null;
    cachedRays: CachedArrowRay[];
    travelledPositions: Vector3[];
    onTravelCbs: Set<(pos: Vector3) => void>;
    lookDirection: Vector3;
    sphere: Mesh | null;
    trailObj: Mesh | null;
    trailGeo: BufferGeometry | null;
    trailMat: ShaderMaterial | null;
    stuckInHingeId: number;
    hingeImpactMatrix: Matrix4 | null;
    boundUpdateHingePosition: () => void;
    didHitWorld: boolean;
    didHitPlayer: boolean;
    worldHitTime: number;
    worldHitRot: Quaternion | null;
    worldHitTangent: Vector3 | null;
    worldHitLastRayDistance: number;
    destructed: boolean;
    constructor(physics: PhysicsManager, hingeManager: HingeManager, shotBy: Player, { arrowId, pos, networkOffsetPos, dir, fireAmount01 }: ArrowSpawnOptions, { arrowManager, scene }: ArrowManagerOptions);
    destructor(): void;
    get damageMultiplier(): number;
    getStunData(): {
        amount: number;
        duration: number;
        fadeDuration: number;
    };
    initModel(): void;
    initTrail(): void;
    loop(createTime: number, e: number): void;
    consume(): void;
    getWorldHitRot(t?: number): Quaternion | null;
    getImpactShake(t: number): number;
    updateHingePosition(t: HingeObject): void;
    onTravel(t: (pos: Vector3) => void): void;
    getParabolaPoint3d(t: number, e?: boolean, i?: boolean): Vector3;
    getNearbyStartAmount(t: Vector3): number;
    map3dDirTo2d(t: Vector3): {
        newDir: Vector3;
        spaceRotation: Quaternion;
        inverseSpaceRotation: Quaternion;
    };
    getParabolaPoint2d(t: number, e: number, i: number): Vector2;
    sCurve(t: number, e?: number): number;
    getParabolaExtremePoint(): Vector2;
    getMaxDistanceT(): number;
}
export interface DebugLine {
    from: Vector3;
    to: Vector3;
    color?: number;
    line: Line | null;
}
declare class ArrowManager {
    physics: PhysicsManager;
    hingeManager: HingeManager;
    teamCount: number;
    /** the key is the player ID, the value map's key is the arrow ID. */
    arrows: Map<number, Map<number, Arrow>>;
    oldPlayerArrows: Set<Arrow>;
    sphereGeos: IcosahedronGeometry[];
    destructed: boolean;
    constructor(physics: PhysicsManager, hingeManager: HingeManager, teamCount: number);
    destructor(): void;
    getSphereGeo(index: number): IcosahedronGeometry | undefined;
    loop(now: number, dt: number): void;
    createArrow(shotBy: Player, params: ArrowSpawnOptions): void;
    getArrowById(playerId: number, arrowId: number): Arrow | null;
    receivedHitValidationData(t: unknown): void;
}
declare class AccuracyOffset {
    crosshair: Crosshair;
    _offset: number;
    constructor(crosshair: Crosshair);
    get offset(): number;
    set offset(value: number);
}
declare class Crosshair {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    lines: Array<{
        el: HTMLElement;
        rotation: number;
    }>;
    flagReturnProgressSvg: SVGSVGElement;
    flagReturnProgressPath1: SVGPathElement;
    flagReturnProgressPath2: SVGPathElement;
    accuracyOffsets: Set<AccuracyOffset>;
    currentAccuracy: number;
    smoothAccuracy: number;
    gameUiVisibility: boolean;
    thirdPersonVisibility: boolean;
    deadVisibility: boolean;
    mainInfoTextVisibility: boolean;
    boundUpdateThirdPersonVisibility: () => void;
    flagReturnAccuracyOffset: AccuracyOffset;
    boundRebuildLines: () => void;
    boundSetLineColors: () => void;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    rebuildLines(): void;
    setLineColors(): void;
    loop(now: number, dt: number): void;
    createAccuracyOffset(): AccuracyOffset;
    deleteAccuracyOffset(t: AccuracyOffset): void;
    updateAccuracyOffset(): void;
    setFlagReturnProgress(e: number): void;
    setFlagReturnProgressVisibility(t: boolean): void;
    setGameUiVisibility(t: boolean): void;
    setDeadVisibility(t: boolean): void;
    setMainInfoTextVisibility(t: boolean): void;
    updateThirdPersonVisibility(): void;
    updateVisibility(): void;
}
declare class ScoreDot {
    el: SVGSVGElement;
    returnTimerRectId: string;
    removePointPolygonId: string;
    points: Vector2[];
    lastBorderTimerPercent: number;
    returnTimerRect: HTMLElement | null;
    removePointPolygon: HTMLElement | null;
    removeAnimationTimeout: Timeout;
    constructor(teamColor: string);
    getReturnTimerRect(): HTMLElement | null;
    getRemovePointPolygon(): HTMLElement | null;
    setState(grabbed: boolean, captured: number): void;
    setRemoved(removed: boolean, animate: boolean): void;
    setBorderTimerPercent(percent: number): void;
}
type FlagGrabbedState = "return" | "grab" | "drop";
type FlagNotificationType = "capture" | FlagGrabbedState;
interface FlagNotificationData {
    type: FlagNotificationType;
    teamId: FlagScoreItem["teamId"];
}
declare class FlagScoreItem {
    teamId: number;
    el: HTMLDivElement;
    iconEl: SVGSVGElement;
    onNeedsNotificationCbs: Set<(notification: FlagNotificationData) => void>;
    hasReceivedScore: boolean;
    currentMaxScoreCount: number;
    score: number;
    grabbedState: FlagGrabbedState;
    removeScoreTimerIsRunning: boolean;
    removeScoreTimer: number;
    prevNow: number;
    timerStateReceived: boolean;
    dots: ScoreDot[];
    constructor(teamId: number);
    setScore(score: number): void;
    setScoreTimerState(score: FlagScoreTimerState): void;
    getBorderTimerPercent(): number;
    loop(now: number, dt: number): void;
    setGrabbedState(grabbedState: FlagGrabbedState): void;
    updatePointIcons(): void;
    getFinalFlagHeld(): boolean;
    get hasFullScore(): boolean;
    getScoreWithGrabbedState(): number;
    onNeedsNotification(cb: (notification: FlagNotificationData) => void): void;
    fireNeedsNotification(type: FlagNotificationType): void;
}
interface FlagScoreTimerState {
    maxScoreCount: number;
    msUntilRemove: number;
    timerRunning: boolean;
}
declare class FlagScoreboard {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    onNeedsNotificationCbs: Set<(data: FlagNotificationData) => void>;
    scoreItems: FlagScoreItem[];
    constructor(gameWrapper: HTMLElement, teams: number);
    destructor(): void;
    update(scores: number[]): void;
    setFlagScoreTimerState(score: FlagScoreTimerState): void;
    loop(now: number, dt: number): void;
    setFlagGrabbedState(index: number, grabbedState: FlagGrabbedState): void;
    getFinalFlagHeld(): boolean;
    getWinningTeam(): number | null;
    getFlagsRatio(): number;
    onNeedsNotification(t: (data: FlagNotificationData) => void): void;
    setVisible(visible: boolean): void;
}
declare class HealthUi {
    gameWrapper: HTMLElement;
    seed: number;
    el: HTMLDivElement;
    barContainerEl: HTMLDivElement;
    bgBar: HTMLDivElement;
    mainBarContainer: HTMLDivElement;
    mainBar: HTMLDivElement;
    damageProtectionBarContainer1: HTMLDivElement;
    damageProtectionBarContainer2: HTMLDivElement;
    damageProtectionBar: HTMLDivElement;
    borderBar: HTMLDivElement;
    heartContainer: HTMLDivElement;
    fgEl: Element | undefined;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    setHealth(health: number): void;
    flashDamageProtection(t: number): void;
    setVisible(visible: boolean): void;
    setCssColor(color: string, borderColor: string): void;
}
declare class SkipText {
    el: HTMLDivElement;
    text: string;
    currentTimerValue: number;
    currentInterval: number | null;
    onTimerEndCbs: Set<(value?: unknown) => void>;
    onSkipActionCbs: Set<(value?: unknown) => void>;
    creationCooldownEnd: number;
    allowSpaceSkip: boolean;
    keyDownCb: (e: KeyboardEvent) => void;
    constructor();
    destructor(): void;
    setText(text: string): void;
    setVisibility(visible: boolean): void;
    updateText(): void;
    startTimer(t?: number): void;
    stopTimer(): void;
    startCreationCooldown(): void;
    setAllowSpaceSkip(allowSpaceSkip: boolean): void;
    waitForTimerEnd(): Promise<void>;
    waitForSkipAction(): Promise<void>;
    fireSkipAction(): void;
    waitForSkip(): Promise<void>;
}
declare class PlayersListDialog extends Dialog {
    playersList: Map<number, Player>;
    skinManager: SkinsManager;
    teamWonTitle: HTMLHeadingElement;
    teamsContainer: HTMLDivElement;
    currentAvatarBlobUrlReferences: Set<BlobURLReference>;
    configuredColumnTypes: string[];
    teamEls: {
        containerEl: HTMLElement;
        tbody: HTMLElement;
        name: string;
        colGroupEl: HTMLElement;
        headerRowEl: HTMLElement;
    }[];
    skipText: SkipText;
    scoresFrozen: boolean;
    playersListDirty: boolean;
    boundOnResize: () => void;
    constructor(gameWrapper: HTMLElement, playersList: Map<number, Player>, skinManager: SkinsManager, customOnCurtainClickCb: () => boolean);
    destructor(): void;
    onVisibilityChange(): void;
    onResize(): void;
    playersListChanged(): void;
    updateTeamsOrder(t?: number): void;
    setActiveGamemode(gamemode: number): void;
    updateTableHeaders(): void;
    updatePlayersList(): void;
    freezeScores(): void;
    setGameEndState(teamId: number): void;
}
declare class NotificationsUi {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    currentIconEl: HTMLDivElement | null;
    constructor(gameWrapper: HTMLElement, className?: string);
    destructor(): void;
    showIcon(url: string | null): void;
    removeIcon(): void;
}
interface ScoreOffsetNotification {
    el: HTMLDivElement;
    destroyTime: number;
}
declare class ScoreOffsetNotificationsUi {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    listEl: HTMLDivElement;
    createdNotifications: ScoreOffsetNotification[];
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    showOffsetNotification(t: number, e: number): void;
    destroyOldNotifications(): void;
    updateNotificationOffsets(): void;
    removeAll(): void;
}
interface GameOverStatsDialogOpts {
    trackedMyPlayerScores: Map<number, number>;
    totalScore: number;
    myTeamId: number;
    receivedCoins: number;
    coinsAlreadyDoubled: boolean;
    autoSkipStatsScreen: SettingValue | undefined;
}
declare class GameOverStatsDialog extends Dialog {
    statsContainer: HTMLDivElement;
    didWatchRewardedAd: boolean;
    rewardedAdFailed: boolean;
    onRewardedAdIsPlayingChangeCbs: Set<(playing: boolean) => void>;
    skipText: SkipText;
    boundOnResize: () => void;
    constructor(t: HTMLElement, { trackedMyPlayerScores, totalScore, myTeamId, receivedCoins, coinsAlreadyDoubled, autoSkipStatsScreen, }: GameOverStatsDialogOpts);
    onResize(): void;
    onRewardedAdIsPlayingChange(t: (playing: boolean) => void): void;
    fireRewardedAdIsPlayingChange(t: boolean): void;
}
declare class GameEndTimer {
    timeSeconds: number;
    name: string;
    running: boolean;
    startTime: number;
    cleared?: boolean;
    onSuddenChangeCbs: Set<() => void>;
    constructor(timeSeconds?: number, name?: string);
    setTotalTime(timeSeconds: number): void;
    start(): void;
    clear(): void;
    onSuddenChange(cb: () => void): void;
    get timeRemaining(): number;
    toString(): string;
}
interface CornerStatData {
    name: string;
    redThreshold?: number;
}
declare class CornerStat {
    cornerStatsUi: CornerStatsUi;
    redThreshold: number | undefined;
    el: HTMLDivElement;
    valueEl: HTMLSpanElement;
    constructor(cornerStatsUi: CornerStatsUi, { name, redThreshold }: CornerStatData);
    setValue(value: number | string): void;
}
declare class CornerStatsUi {
    game: Game;
    container: HTMLDivElement;
    createdStats: CornerStat[];
    fpsStat: CornerStat;
    pingStat: CornerStat;
    networkStabilityStat: CornerStat;
    visible: boolean;
    _onVisiblityChangeCbs: Set<() => void>;
    constructor(gameWrapper: HTMLElement, game: Game);
    destructor(): void;
    createCornerStat(data: CornerStatData): CornerStat;
    updateVisibility(): void;
    onVisibilityChange(t: () => void): void;
}
interface ChatMessage {
    contentsEl: HTMLDivElement;
    messageEl: HTMLDivElement;
    playerId: number;
    avatarBlobReference: BlobURLReference | null;
    lastMessageTime: number;
}
interface RawChatMessage {
    type: "playerMessage";
    data: {
        playerId: number;
        message: string;
        guardianRejected?: boolean;
    };
}
declare class Chat {
    gameWrapper: HTMLElement;
    game: OnlineGame;
    createdMessages: ChatMessage[];
    visible: boolean;
    toggledVisible: boolean;
    el: HTMLDivElement;
    chatLogEl: HTMLDivElement;
    formEl: HTMLFormElement;
    textBoxEl: HTMLInputElement;
    chatKey: InputKey;
    boundChatKeyCb: () => void;
    chatVisibilityKey: InputKey;
    boundChatVisibilityKeyCb: () => void;
    boundUpdateVisibilities: () => void;
    boundOnTouchSupported: () => void;
    constructor(gameWrapper: HTMLElement, game: OnlineGame);
    destructor(): void;
    loop(): void;
    destroyMessage(msg: ChatMessage): void;
    sendMessage(): void;
    receivedChatMessage(message: RawChatMessage): void;
    updateVisibility(): void;
    updateTouchButtonVisibility(): void;
    updateHeight(): void;
}
declare class OctreeNode {
    aabb: Box3;
    depth: number;
    items: ColliderBase[];
    allChildren: OctreeNode[];
    children: Set<OctreeNode>;
    constructor(aabb: Box3, depth?: number);
    addItems(items: ColliderBase[]): void;
    subdivideRecursive({ boundsContainsCb, maxDepth, itemCountDivideLimit }: {
        boundsContainsCb: (collider: ColliderBase, aabb: Box3) => boolean;
        maxDepth: number;
        itemCountDivideLimit: number;
    }): void;
    subdivide(): void;
    traverseDown(childFilter?: (child: OctreeNode) => boolean): Generator<OctreeNode>;
    findEndNodes(t?: () => boolean): Generator<OctreeNode, void, unknown>;
}
export interface RayCastCache {
    from: Vector3;
    to: Vector3;
    dir: Vector3;
    length: number;
    octreeNodes: Set<OctreeNode>;
}
export type RayCastFilter = (hit: RayCastHit) => boolean;
declare class PhysicsManager {
    rigidBodies: Set<RigidBody>;
    mapColliders: ColliderBase[];
    rootOctreeNode: OctreeNode | null;
    octreeMaxDepth: number;
    mapBounds: Box3 | null;
    octreeAxisVoxelCount: number;
    worldToOctreeVoxelSpaceMultiplier: Vector3;
    isLoweringTimeScale: boolean;
    timeScale: number;
    stepCount: number;
    flyRoofHeight: number;
    flySphereRadius: number;
    flySphereCenter: Vector3;
    constructor();
    destructor(): void;
    loop(t: number, e: number): void;
    startLoweringTimeScale(): void;
    resetTimeScale(): void;
    registerRigidBody(t: RigidBody): RigidBody;
    removeRigidBody(t: RigidBody): void;
    addMapCollider(t: {
        matrix: number[];
        colliderType?: string;
    }): ColliderBase;
    removeMapColliders(): void;
    buildOctree(): void;
    getOctreeNodesInAabb(box: Box3, e?: boolean): Set<OctreeNode>;
    getCollidersFromOctreeNodes(octreeNodes: Iterable<OctreeNode>): Set<ColliderBase>;
    getCollidersForAabbUsingOctree(box: Box3): Set<ColliderBase>;
    worldToOctreeVoxelSpace(vec: Vector3): number[];
    octreeVoxelSpaceToNodePath([e, i, s]: [number, number, number]): number[] | null;
    getOctreeNodeForPath(t: number[]): OctreeNode | null;
    getColliders(): Generator<Collider | ColliderBase, void, unknown>;
    getPlayerColliders(): Generator<Collider, void, unknown>;
    getRayCastCache(from: Vector3, to: Vector3): RayCastCache | null;
    rayCastMapColliders(cache: RayCastCache, filter?: RayCastFilter | null): RayCastHit | null;
    rayCastPlayerColliders(cache: RayCastCache, filter?: RayCastFilter | null): RayCastHit | null;
    rayCastHelper(cache: RayCastCache, colliders: Iterable<{
        rayCast(from: Vector3, dir: Vector3): RayCastHit | null;
    }>, filter?: RayCastFilter | null): RayCastHit | null;
}
export type ColorArray = [number, number, number];
export type VectorArray = [number, number, number];
/** Map variables as received from mapConfigs/{mapName}.json (see mapConfig.v1.json schema). All fields optional; defaults apply. */
export interface MapVariables {
    name?: string;
    probability?: number;
    floorDeathHeight?: number;
    flyRoofHeight?: number;
    flySphereRadius?: number;
    flySphereCenter?: VectorArray;
    sphereDeathRadius?: number;
    cloudsHeight?: number;
    waterSfxVolume?: number;
    waterSfxHeight?: number;
    windSfxVolume?: number;
    windSfxBoostVolume?: number;
    windSfxBoostHeight?: number;
    birdsSfxVolume?: number;
    jungleSfxVolume?: number;
    rainSfxVolume?: number;
    insectsSfxVolume?: number;
    skyHighColor?: ColorArray;
    skyMidColor?: ColorArray;
    skyLowColor?: ColorArray;
    skyPower?: number;
    fogAmount?: number;
    fogHeightAmount?: number;
    fogHeightOffset?: number;
    fogHeightDistFalloff?: number;
    fogHeightAmountMin?: number;
    fogHeightAmountMax?: number;
    colorMultiplier?: ColorArray;
    colorMultiplierAdjust?: number;
    colorAdder?: ColorArray;
    colorAdderAdjust?: number;
    saturation?: number;
    lightningEnabled?: boolean;
}
/** Map variables with all defaults applied. */
export interface ResolvedMapVariables {
    floorDeathHeight: number;
    sphereDeathRadius: number;
    flyRoofHeight: number;
    flySphereCenter: VectorArray;
    flySphereRadius: number;
    cloudsHeight: number;
    waterSfxVolume: number;
    waterSfxHeight: number;
    windSfxVolume: number;
    windSfxBoostVolume: number;
    windSfxBoostHeight: number;
    birdsSfxVolume: number;
    jungleSfxVolume: number;
    rainSfxVolume: number;
    insectsSfxVolume: number;
    skyHighColor: ColorArray;
    skyMidColor: ColorArray;
    skyLowColor: ColorArray;
    skyPower: number;
    fogAmount: number;
    fogHeightAmount: number;
    fogHeightOffset: number;
    fogHeightDistFalloff: number;
    fogHeightAmountMin: number;
    fogHeightAmountMax: number;
    colorMultiplier: ColorArray;
    colorMultiplierAdjust: number;
    colorAdder: ColorArray;
    colorAdderAdjust: number;
    saturation: number;
    lightningEnabled: boolean;
}
/** Top-level shape of mapConfigs/{mapName}.json (see mapConfig.v1.json schema). */
export interface MapConfigFile {
    $schema?: string;
    mirrorMode?: "rotate" | "flipX" | "flipZ";
    globalMapVariables?: MapVariables;
    randomMapVariableSets?: MapVariables[];
    kingOfTheHillPosition?: VectorArray;
}
declare class MapVariablesManager {
    lastReceivedGlobalVariables: MapVariables;
    lastReceivedRandomVariablesArray: MapVariables[];
    currentVariablesIndex: number;
    variablesIndexSeed: number;
    defaultValues: ResolvedMapVariables;
    onVariablesChangedCbs: Set<() => void>;
    currentVariables: ResolvedMapVariables;
    constructor();
    init(): void;
    setVariables(receivedGlobalVariables: MapVariables | null | undefined, lastReceivedRandomVariablesArray: MapVariables[]): void;
    updateVariablesIndex(): void;
    setSeed(seed: number): void;
    updateVariablesFromArray(): void;
    onVariablesChanged(cb: () => void): void;
    get<K extends keyof ResolvedMapVariables>(key: K): ResolvedMapVariables[K];
}
interface RawGameplayData {
    flags: {
        flagTeamId: number;
        pos: number[];
        rot: number[];
    }[];
    spawnPositions: {
        pos: number[];
        rot: number[];
    }[][];
    mapName: string;
    assetName: string;
    kingOfTheHillPosition: number[];
    colliders: unknown;
}
interface GameplayData {
    flags: {
        flagTeamId: number;
        pos: Vector3;
        rot: Quaternion;
    }[];
    spawnPositions: {
        pos: Vector3;
        rot: Quaternion;
    }[][];
    mapName: string;
    assetName: string;
    kingOfTheHillPosition: Vector3;
}
interface GameplayDataInfo {
    type: "gameplay-data";
    gameplayData: GameplayData;
}
interface CollidersInfo {
    type: "colliders";
    colliders: unknown;
}
interface SceneInfo {
    type: "scene";
    scene: unknown;
    appearingObjects: unknown;
    hinges: unknown;
}
type MapLoadingInfo = GameplayDataInfo | CollidersInfo | SceneInfo;
declare class MapLoader {
    configManager: ConfigManager;
    mapsConfig: MapsConfig;
    onIsLoadingMapChangeCbs: Set<unknown>;
    isLoadingMap: boolean;
    loadCloudsCalled: boolean;
    environmentIsInit: boolean;
    cachedMapHashes: Set<string>;
    fetchingMapCbs: Map<any, any>;
    onOneMapAvailableCbs: Set<() => void>;
    firstMapDownloaded: boolean;
    onFirstMapDownloadedCbs: Set<() => void>;
    onMapCachedCbs: Set<() => void>;
    mapVariablesManager: MapVariablesManager;
    cloudsObj: Object3D | null;
    currentLoadingMapContexts: Map<number, {
        cb: (info: MapLoadingInfo) => void;
        loadingText: InfoText;
    }>;
    lastMapLoadRequestId: number;
    lastLoadMapRequest: {
        options: unknown;
        cb: (info: MapLoadingInfo) => void;
    } | null;
    constructor(configManager: ConfigManager, mapsConfig: MapsConfig);
    init(): Promise<void>;
    cacheRemainingMaps(): Promise<void>;
    openCache(): Promise<Cache | null>;
    markMapAsCached(t: string, e?: boolean): void;
    hasCachedMap(hash: string): boolean;
    deleteLegacyCaches(): Promise<void>;
    deleteOldMapCaches(): Promise<void>;
    waitForOneMapAvailable(): Promise<void>;
    fireFirstMapAvailable(): void;
    waitForFirstMapDownload(): Promise<void>;
    onMapCached(t: () => void): void;
    fireOnMapCachedCbs(): void;
    reloadMap(): void;
    loadDevMap(t: (info: MapLoadingInfo) => void): Promise<void>;
    loadLoadingMap(t: (info: MapLoadingInfo) => void): Promise<void>;
    loadConfigMap(t: string, e: Record<string, unknown>, i: (info: MapLoadingInfo) => void, { retryOnFail }?: {
        retryOnFail?: boolean | undefined;
    }): Promise<void>;
    loadConfigMapWithDialogMessage(t: string, e: Record<string, unknown>, i: (info: MapLoadingInfo) => void): Promise<boolean>;
    loadMap(params: {
        request: {
            type: string;
            [k: string]: unknown;
        };
        [k: string]: unknown;
    }, cb: (info: MapLoadingInfo) => void): Promise<void>;
    reloadMapsConfigAndRetryLoadConfigMap(t: string, e: Record<string, unknown>, i: (info: MapLoadingInfo) => void): Promise<void>;
    reportFirstMapDownloaded(): void;
    reportMapLoadProgress(t: number, e: number): void;
    setGamplayObjects(rawGameplayData: RawGameplayData, e: number): void;
    loadMapResponseCbReceived(t: {
        scene: unknown;
        hingeObjects: {
            object: unknown;
            behavior: unknown;
        }[];
        appearingObjects?: {
            objects: {
                object: unknown;
                startOffset: number[];
            }[];
            triggers: {
                pos: number[];
                radius: number;
            }[];
            behavior: unknown;
        }[];
        lobbyCamPositions?: {
            posA: number[];
            rotA: number[];
            posB: number[];
            rotB: number[];
        }[];
        mapConfig?: {
            globalMapVariables?: unknown;
            randomMapVariableSets?: unknown[];
        };
    }, e: (info: MapLoadingInfo) => void): void;
    initEnvironment(): void;
    updateWeatherParams(): void;
    updateCloudHeight(): void;
    static disposeMapGeometries(t: Object3D): void;
    loadClouds(): Promise<void>;
}
interface MapVoteData {
    votedScore: number;
    hasTemporaryBoost: boolean;
    lastPlayedCounter: number;
}
declare class PreferredMapManager {
    mapLoader: MapLoader;
    mapsConfigLoader: MapsConfig;
    votedScores: Map<string, MapVoteData>;
    _forcingSoloMap: string | null;
    onMatchMakeDataChangeCbs: Set<() => void>;
    constructor(mapLoader: MapLoader, mapsConfigLoader: MapsConfig);
    onMatchMakeDataChange(cb: () => void): void;
    getMatchMakePreferredMapHashes(): {
        hash: string;
        preference: number;
    }[] | null;
    getMatchMakeData(): {
        op: string;
        mapHashes: {
            hash: string;
            preference: number;
        }[];
        configTimestamp: number;
        allowPreferredOnly: boolean;
    } | null;
    getRandomPreferredMapHash(): string | number | null;
    getOrCreateMapVoteData(name: string): MapVoteData;
    voteMap(t: unknown): void;
    markRecentMap(hash: string): void;
    forceSoloMap(hash: string | null): void;
    disableForcedSoloMap(): void;
    get isForcingSoloMap(): boolean;
    get forcingSoloMap(): string | null;
}
export interface AppearingObjectsEntry {
    objects: Array<{
        object: Object3D;
        startPos: Vector3;
        endPos: Vector3;
        animationFinished: boolean;
        duration: number;
        [key: string]: unknown;
    }>;
    triggers: Array<{
        pos: Vector3;
        radius: number;
    }>;
    hasBeenTriggered: boolean;
    allAnimationsFinished: boolean;
    t: number;
    behavior: string;
}
declare class AppearingObjectsManager {
    appearingObjects: AppearingObjectsEntry[];
    destructed: boolean;
    constructor();
    destructor(): void;
    removeObjects(): void;
    setAppearingObjects(t: Array<{
        objects: Array<{
            object: Object3D;
            startOffset?: Vector3;
            [key: string]: unknown;
        }>;
        triggers: Array<{
            pos: Vector3;
            radius: number;
        }>;
        behavior: string;
    }>): void;
    updatePlayerPositions(t: Vector3[]): void;
    loop(now: number, dt: number): void;
}
export interface HingeObject {
    object: Object3D;
    behavior: string;
    defaultWorldMatrix: Matrix4;
    defaultWorldMatrixInv: Matrix4;
    worldPos: Vector3;
}
declare class HingeManager {
    hingeObjects: HingeObject[];
    activeHingeObjects: Map<number, {
        physicsValue: SpringValue;
    }>;
    onHingeMoveCbs: Map<number, Set<(obj: HingeObject) => void>>;
    destructed: boolean;
    constructor();
    destructor(): void;
    setHingeObjects(t: Array<{
        hinge: Object3D;
        behavior: string;
    }>): void;
    shootHinge(t: number, e: Vector3, i: Vector3): HingeObject | null;
    onHingeMove(id: number, cb: (obj: HingeObject) => void): void;
    removeOnHingeMove(id: number, cb: (obj: HingeObject) => void): void;
    loop(now: number, dt: number): void;
}
interface TimeRemainingData {
    remaining: number;
    receivedAt: number;
}
declare class GameTimerUi {
    gameWrapper: HTMLElement;
    visible: boolean;
    el: HTMLDivElement;
    tenMinutesEl: HTMLSpanElement;
    oneMinuteEl: HTMLSpanElement;
    tenSecondsEl: HTMLSpanElement;
    oneSecondEl: HTMLSpanElement;
    timeRemainingData: TimeRemainingData | null;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    addDigitEl(): HTMLSpanElement;
    setTimeRemaining(remaining: number): void;
    loop(now: number, dt: number): void;
    setVisible(visible: boolean): void;
    updateVisibility(): void;
}
declare class EliminationTeamScore {
    teamId: number;
    el: HTMLDivElement;
    teamColor: "#24a3dd" | "#2d702f" | "#a3a3a3" | "#bababa" | "#e5302c";
    playerDots: ScoreDot[];
    alivePlayers: number;
    constructor(teamId: number);
    setPlayerCount(t: number, e: number): void;
    get hasAlivePlayer(): boolean;
}
declare class EliminationScoreUi {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    scoreTeams: EliminationTeamScore[];
    constructor(gameWrapper: HTMLElement, teams: number);
    destructor(): void;
    setPlayerCount(teamId: number, e: number, i: number): void;
    getWinningTeam(): number | null;
    setVisible(visible: boolean): void;
}
declare class GamemodeLabel {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    gamemodeEl: HTMLSpanElement;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    setActiveGamemode(gamemode: number): void;
    setVisible(visible: boolean): void;
}
declare class KingOfTheHillUi {
    gameWrapper: HTMLElement;
    visible: boolean;
    el: HTMLDivElement;
    progressEls: HTMLDivElement[];
    redScore: number;
    blueScore: number;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    setProgress(redScore: number, blueScore: number, total: number): void;
    getWinningTeam(): number | null;
    setVisible(visible: boolean): void;
    updateVisibility(): void;
}
interface GameEndAccountStats {
    receivedCoins: number;
    newCoinCount: number;
    alreadyDoubled: boolean;
}
declare class OnlineGame {
    #private;
    gameWrapper: HTMLElement;
    teamCount: number;
    activeGamemode: number;
    physics: PhysicsManager;
    players: Map<number, Player>;
    hingeManager: HingeManager;
    arrowManager: ArrowManager;
    crosshair: Crosshair;
    flags: Flag[];
    appearingObjectsManager: AppearingObjectsManager;
    gameIsVisible: boolean;
    receivedColliders: boolean;
    scene: Object3D | null;
    onGameIsVisibleCbs: Set<() => void>;
    onUsedForCamShotsOnlyChangeCbs: Set<() => void>;
    _usedForCameraShotsOnly: boolean;
    uiVisible: boolean;
    activeGamemodeUi: GamemodeLabel | null;
    flagScoreUi: FlagScoreboard | null;
    eliminationScoreUi: EliminationScoreUi | null;
    gameTimerUi: GameTimerUi | null;
    kingOfTheHillUi: KingOfTheHillUi | null;
    healthUi: HealthUi;
    weaponSelectionDialog: WeaponSelectionDialog;
    playersListDialog: PlayersListDialog;
    gameOverStatsDialog: GameOverStatsDialog | null;
    cornerNotificationsUi: NotificationsUi;
    gameOverNotificationsUi: NotificationsUi;
    crosshairNotificationsUi: NotificationsUi;
    scoreOffsetNotificationsUi: ScoreOffsetNotificationsUi;
    cornerStatsUi: CornerStatsUi;
    waitingForPlayersInfoText: InfoText;
    gameEndLoweringTimeScaleDuration: number;
    gameEndTitleDurationWin: number;
    gameEndTitleDurationLose: number;
    gameEndPlayersListDuration: number;
    gameEndShowStatsDuration: number;
    gameEndRewardedAdDuration: number;
    gameEndShowStatsAfterRewardedDuration: number;
    trackedMyPlayerScores: Map<number, number>;
    spawnPositions: {
        pos: Vector3;
        rot: Quaternion;
    }[][] | null;
    kingOfTheHillPosition: Vector3;
    kingOfTheHillSphere: Group | null;
    isForegroundGame: boolean;
    gameStartTime: number;
    gameStarted: boolean;
    gameEnded: boolean;
    gameSeed: number;
    onGameSeedChangeCbs: Set<(seed: number) => void>;
    finishedGameEndFlow: boolean;
    destructed: boolean;
    shouldPlayFinalFlagMusic: boolean;
    currentFinalFlagMusic: SFXSound | null;
    currentGameEndWaitingMusic: SFXSound | null;
    onMyPlayerChangeCbs: Set<() => void>;
    onGameEndCbs: Set<() => void>;
    onGameEndFinishCbs: Set<() => void>;
    gameEndWaitTimers: GameEndTimer[];
    gameEndTimerSuddenChangeDisabled: boolean;
    onEstimatedMaxGameEndWaitTimeSuddenChangeCbs: Set<() => void>;
    onSdkGameplayStartedChangeCbs: Set<() => void>;
    onSquadPlayersChangeCbs: Set<() => void>;
    onGameEndAccountStatsChangeCbs: Set<() => void>;
    gameEndStepsReachedStatScreens: boolean;
    onGameEndStatsScreenCbs: Set<() => void>;
    isDoingGameEndSteps: boolean;
    gameEndMyTotalScore: number;
    gameEndReceivedCoins: number;
    gameEndCoinsAlreadyDoubled: boolean;
    gameEndShowStatsScreen: boolean;
    gameEndStatsShowTimer: GameEndTimer | null;
    gameEndAdBreakTimer: GameEndTimer | null;
    gameEndRewardedAdTimer: GameEndTimer | null;
    gameEndStatsAfterRewardedAdTimer: GameEndTimer | null;
    currentLoadedMapHash: string | null;
    boundUpdateUiVisible: () => void;
    boundOnPlayerListDown: () => boolean;
    boundOnPlayerListUp: () => boolean;
    antiCheat: AntiCheat;
    chat: Chat;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    get sdkGameplayStarted(): boolean;
    onSdkGameplayStartedChange(cb: () => void): void;
    fireSdkGameplayStartedChange(): void;
    setActiveGamemode(gamemode: number): void;
    createKingOfTheHillSphereIfNeeded(): void;
    updateKingOfTheHillRenderPosition(): void;
    setGameTimerTimeRemaining(timeRemainingMs: number): void;
    loadMap(t: string): Promise<void>;
    setMapScene(scene: Object3D | null, mapHash: string | null): void;
    updateMapGameplayData(mapGameplayData: {
        flags: {
            flagTeamId: number;
            pos: Vector3;
            rot: Quaternion;
        }[];
        spawnPositions: {
            pos: Vector3;
            rot: Quaternion;
        }[][];
        mapName: string;
        assetName: string;
        kingOfTheHillPosition: Vector3;
    }): void;
    setServerGameTime(serverTime: number): void;
    setServerGameSeed(seed: number): void;
    onGameSeedChange(cb: (seed: number) => void): void;
    get gameTime(): number;
    notifyServerCurrentMap(): void;
    createPlayer(id: number, params?: Partial<PlayerParams>): void;
    destroyPlayer(id: number): void;
    setPlayerOwnership(id: number, ownership: boolean): void;
    getMyTeamColor(): {
        colors: (typeof teamData)[number];
        myTeamId: number;
    };
    updateMyTeamColor(): void;
    setPlayerName(t: number, e: string): void;
    setPlayerNameVerified(t: number): void;
    setPlayerTeamId(t: number, e: number): void;
    setPlayerServerFlyEnabled(playerID: number, enabled: boolean): void;
    setSameSquadPlayerData(data: {
        playerId: number;
        squadPlayerId: number;
        isLeader: boolean;
    }[]): void;
    onSquadPlayersChange(cb: () => void): void;
    fireSquadPlayersChange(): void;
    setPlayerScores(t: PlayerScoreData & {
        playerId: number;
    }): void;
    createFlag(teamId: number, position: Vector3, rotation: Quaternion): void;
    getMyFlags(t?: number): Generator<Flag, void, unknown>;
    getEnemyFlags(t?: number): Generator<Flag, void, unknown>;
    playerChangeFlag(t: number, e: number, i: number): void;
    showFlagNotification(notification: FlagNotificationData): void;
    setFlagDroppedPosition(t: number, e: number, i: number, s: number, n: number, o: number, a: number): void;
    loop(now: number, dt: number): void;
    getMyPlayer(): Player | null;
    getMyTeamId(): number;
    updatePlayerIconVisibilities(): void;
    updateWaitingForPlayersText(): void;
    setPlayerServerData(t: number, e: number, i: number, s: number, n: number, o: number, a?: boolean): void;
    playerServerDataFrameEnded(): void;
    setPlayerPingData(t: number, e: number): void;
    createServerArrow(t: number, e: number, i: number, s: number, n: number, o: number, a: number, r: number, l: number): void;
    getSpawnPosition(team: number, key: number): {
        pos: Vector3;
        rot: Quaternion;
    };
    playerClaimedHitByArrow(t: number, e: number, i: number, s: number): void;
    playerHitByMelee(t: number, e: number): void;
    playerHitByArrow(victimID: number, attackerID: number): void;
    verifiedKillByServer(t: number, e: number): void;
    forceSetPlayerHealthFromServer(t: number, e: number): void;
    receivedPlayerPerformAction(t: number, e: number): void;
    receivedPlayerSpawn(t: number, e: number, i: number): void;
    receivePlayerChangeClass(t: number, e: number): void;
    receivePlayerChangeWeaponType(t: number, e: boolean): void;
    setPlayerEquippedSkinData(t: number, e: SkinData): void;
    setPlayerGungameWeaponIndex(t: number, weaponIndex: number): void;
    updateFlagScoreboard(scores: number[]): void;
    updateAllEliminationScoreboards(): void;
    updateEliminationScoreboard(teamId: number): void;
    updateFlagGrabbedStates(): void;
    updateFinalFlagMusic(): Promise<void>;
    showKillNotification(): void;
    showKilledNotification(): void;
    offsetPlayerScore(playerID: number, e: number, i: number): void;
    ownedPlayerDied(): void;
    notifyGameStarted(): void;
    receivedGameEndAccountStats(t: GameEndAccountStats): void;
    updateGameEndShowStatsScreen(): void;
    notifyGameEnded(): void;
    doGameEndSteps(): Promise<void>;
    canEstimateGameEndWaitTime(): boolean;
    estimateMaxGameEndWaitTimeSeconds(): number;
    createGameEndWaitTimer(timeSeconds?: number, name?: string): GameEndTimer;
    onEstimatedMaxGameEndWaitTimeSuddenChange(cb: () => void): void;
    fireEstimatedMaxGameEndWaitTimeSuddenChange(): void;
    onMyPlayerChange(cb: () => void): void;
    onGameEnd(cb: () => void): void;
    onGameEndFinish(cb: () => void): void;
    onGameEndStatsScreen(cb: () => void): void;
    closeGameOverStatsDialog(): void;
    finishGameEndFlow(): void;
    onPlayerListDown(): boolean;
    onPlayerListUp(): boolean;
    get usedForCameraShotsOnly(): boolean;
    updateUsedForCameraShotsOnly(): void;
    becameForegroundGame(): void;
    updateSceneVisibility(): void;
    updateGameIsVisible(): void;
    onGameIsVisible(t: () => void): void;
    onUsedForCamShotsOnlyChange(cb: () => void): void;
    updateUiVisible(): void;
    setUiVisible(t: boolean): void;
    reportOwnedPlayerHeadshotKill(t: WeakKey): void;
    reportOwnedPlayerHeadshotMiss(): void;
}
declare class SquadDialog extends Dialog {
    networkManager: NetworkManager;
    squadManager: SquadManager;
    gameManager: GameManager;
    avatarsManager: AvatarsManager;
    skinManager: SkinsManager;
    currentSquadId: string | null;
    squadIdText: HTMLDivElement;
    copyUrlButton: CustomButton;
    clipboardPermissionGranted: boolean;
    joinSquadIdInput: TextInput;
    joinSquadIdButton: CustomButton;
    membersTbody: HTMLTableSectionElement;
    inSquadButtonsContainer: HTMLDivElement;
    boundOnReadyToJoinChange: (ready: boolean) => void;
    startButton: CustomButton;
    squadSettingsDialog: SquadSettingsDialog | null;
    currentAvatarBlobUrlReferences: Set<BlobURLReference>;
    boundUpdateSquadId: () => void;
    boundOnSquadIdChange: () => void;
    boundOnSquadMembersChange: () => void;
    boundOnLeaderStateChange: () => void;
    boundOnSquadSettingChange: (setting: string, value: unknown) => void;
    boundUpdateStartButtonEnabled: (close?: boolean) => void;
    boundUpdateStartButtonEnabledFromStartClicked: () => void;
    boundOnInGameChange: () => void;
    constructor(gameWrapper: HTMLElement, networkManager: NetworkManager, squadManager: SquadManager, gameManager: GameManager, avatarsManager: AvatarsManager, skinManager: SkinsManager);
    destructor(): void;
    handleRequestInitialSquadId(): Promise<void>;
    onSquadIdChanged(): void;
    updateSquadId(): void;
    queryClipboardPermission(): Promise<void>;
    updateCopyUrlButtonVisibility(): void;
    createMemberAvatarEl(memberData: {
        skinData: SkinData;
        [key: string]: unknown;
    }, teamId: number): HTMLDivElement;
    updateMembersUi(): void;
    updateJoinButtonVisibility(): void;
    updateStartButtonEnabled(close?: boolean): void;
    updateReadyStartButtonVisibility(): void;
}
declare class MapListItem {
    #private;
    onJoinClickedCbs: Set<() => void>;
    el: HTMLDivElement;
    titleEl: HTMLHeadingElement;
    thumbContainer: HTMLDivElement;
    constructor(configManager: ConfigManager, mapConfig: ListedMapConfig);
    destructor(): void;
    onJoinClicked(cb: () => void): void;
    highlight(): void;
}
declare class MapsDialog extends Dialog {
    #private;
    configManager: ConfigManager;
    preferredMapManager: PreferredMapManager;
    gameManager: GameManager;
    mapsContainer: HTMLDivElement;
    maps: MapListItem[];
    constructor(gameWrapper: HTMLElement, configManager: ConfigManager, preferredMapManager: PreferredMapManager, gameManager: GameManager);
    destructor(): void;
    updateMaps(mapsConfig: MapsConfigData): void;
    highlightItem(assetName: string): void;
}
declare class MainMenu {
    gameWrapper: HTMLElement;
    el: HTMLElement;
    loadingImageContainer: HTMLElement;
    currentJoinState: "joinable" | "joined" | "joining";
    loadScreenHidden: boolean;
    toggledVisibilityState: boolean;
    toggleMenuButton: CustomButton;
    visible: boolean;
    onVisibilityChangeCbs: Set<(visible: boolean) => void>;
    contentVisible: boolean;
    userProfileDialog: ProfileDialog | null;
    cornerProfile: CornerProfile;
    menuButtonsContainer: HTMLDivElement;
    loginButton: MainMenuButton;
    settingsDialog: SettingsDialog | null;
    settingsButton: MainMenuButton;
    shopDialog: ShopDialog | null;
    shopButton: MainMenuButton;
    squadDialog: SquadDialog | null;
    squadButton: MainMenuButton;
    mapsDialog: MapsDialog | null;
    mapsButton: MainMenuButton;
    fullScreenButton: MainMenuButton;
    exitFullScreenButton: MainMenuButton;
    installButton: MainMenuButton;
    installAvailable: boolean;
    installPromptAccepted: boolean;
    updateButton: MainMenuButton;
    exitButton: MainMenuButton;
    closeGameButton: MainMenuButton | null;
    promoBanner: PromoBanner | null;
    currentMusicSfx: SFXSound | null;
    hideUi: boolean;
    constructor(gameWrapper: HTMLElement);
    init(): void;
    loop(now: number, dt: number): void;
    updateLoadingImageVisibility(): void;
    setJoinState(t: "joinable" | "joined" | "joining"): void;
    updateSquadButtonsText(): void;
    onGameStartGesture(): void;
    updateFullScreenButtonVisibility(): void;
    updateInstallButtonVisibility(): void;
    updateExitGameVisibility(): void;
    makeMainMenuVisibleFromUserGesture(): void;
    makeContentVisible(): void;
    updateVisibility(): void;
    updateToggleMenuVisible(): void;
    onVisibilityChange(t: (visible: boolean) => void): void;
    removeOnVisibilityChange(t: (visible: boolean) => void): void;
    get shouldPlayMusic(): boolean;
    updatePlayingMusic(): Promise<void>;
    openShopDialog(): ShopDialog;
    openUserProfileDialog(t: {
        showExtraStats?: boolean;
    }): void;
    openSquadDialog(): void;
    openMapsDialog(): MapsDialog;
}
declare class GameAdBanner {
    pokiSize: `${number}x${number}`;
    el: HTMLDivElement;
    visible: boolean;
    adEl: HTMLDivElement;
    constructor(platform: string, pokiSize: `${number}x${number}`);
    setVisibility(visible: boolean): void;
    getIsVisible(): boolean;
}
declare class AdBanners {
    gameWrapper: HTMLElement;
    visiblePages: Set<unknown>;
    desktopBanner: GameAdBanner | null;
    mobileBanner: GameAdBanner | null;
    hasRemoveAdsEntitlement: boolean;
    constructor(gameWrapper: HTMLElement);
    init(): Promise<void>;
    getBanners(): Generator<GameAdBanner, void, unknown>;
    setPageVisibility(t: string, e: boolean): void;
    updateVisibilities(): void;
}
interface AlertButton {
    text: string;
    testLabel?: string;
    onClick?: (() => Promise<void>);
    enabled?: boolean | undefined;
}
declare class AlertDialog extends Dialog {
    indexPriority: number;
    closeOnButtonClick: boolean;
    titleEl: HTMLHeadingElement;
    textEl: HTMLDivElement;
    createdButtons: CustomButton[];
    constructor(gameWrapper: HTMLElement, { title, text, buttons, closeOnButtonClick, extraArgs, }?: AlertOpts);
    setButtons(t: AlertButton[]): void;
    setButtonsEnabled(enabled: boolean): void;
    waitForButton(): Promise<number>;
}
interface AlertOpts {
    title?: string;
    text?: string;
    buttons?: AlertButton[];
    closeOnButtonClick?: boolean;
    extraArgs?: Record<string, unknown>;
}
declare class DialogManager {
    gameWrapper: HTMLElement;
    curtainEl: HTMLDivElement;
    _curtainElVisible: boolean;
    onCurtainVisibilityChangeCbs: Set<(visible: boolean) => void>;
    onNeedsUnlockedPointerChangeCbs: Set<() => void>;
    needsUnlockedPointer: boolean;
    lastDialogAddTime: number;
    currentDialogStack: Dialog[];
    onCurtainZIndexChangeCbs: Set<(zIndex: number) => void>;
    onAnyDialogVisibilityChangeCbs: Set<() => void>;
    constructor(gameWrapper: HTMLElement);
    addDialog(t: Dialog): void;
    getDialogForEl(t: HTMLElement): Dialog | null;
    get frontDialog(): Dialog | null;
    get firstClosableDialog(): Dialog | null;
    get hasAnyDialogs(): boolean;
    get curtainElVisible(): boolean;
    closeTopMostDialog(): void;
    showAlert(t: AlertOpts): AlertDialog;
    onAnyDialogVisibilityChange(t: () => void): void;
    fireAnyDialogVisibilityChangeCbs(): void;
    sortStack(): void;
    updateZIndices(): void;
    updateInertDialogs(): void;
    setCurtainZIndex(t: number): void;
    onCurtainZIndexChange(t: (zIndex: number) => void): void;
    onCurtainVisibilityChange(t: (visible: boolean) => void): void;
    removeOnCurtainVisibilityChange(t: (visible: boolean) => void): void;
    onNeedsUnlockedPointerChange(t: () => void): void;
    removeOnNeedsUnlockedPointerChange(t: () => void): void;
    updateFrontDialogProperties(): void;
}
declare class InputKey {
    keyCodes: string[];
    mouseButtons: number[];
    gamepadButtons: number[];
    pressed: boolean;
    pressedGamepad: boolean;
    onPressedChangeCbs: Set<(t: boolean) => boolean>;
    onPressedDownCbs: Set<(i: {
        fromTouchButton?: boolean;
    }) => boolean>;
    onPressedUpCbs: Set<(i: {
        fromTouchButton?: boolean;
    }) => boolean>;
    constructor(opts?: {
        keyCodes?: string[];
        mouseButtons?: number[];
        gamepadButtons?: number[];
    });
    setKeyCodePressed(t: string, e: boolean, i?: boolean): {
        needsPreventDefault: boolean;
        preventOthers: boolean;
    };
    setMouseButtonPressed(t: number, e: boolean, i?: boolean): boolean;
    setPressedGamepadButtons(t: number[], e: boolean): boolean;
    setKeyPressed(t: boolean, e?: boolean, i?: {
        fromTouchButton?: boolean;
    }): boolean;
    onPressedChange(t: (t: boolean) => boolean): void;
    onPressedDown(t: (i: {
        fromTouchButton?: boolean;
    }) => boolean): void;
    onPressedUp(t: (i: {
        fromTouchButton?: boolean;
    }) => boolean): void;
    removeCb(t: ((e: boolean) => boolean) | ((i: {
        fromTouchButton?: boolean;
    }) => boolean)): void;
}
declare class TouchControl {
    el: HTMLDivElement;
    visible: boolean;
    currentUsingTouchId: number | null;
    didUpdateTouchLastLoop: boolean;
    responsiveArea: TouchResponseArea | null;
    cancelOthers: boolean;
    constructor({ responsiveArea, cancelOthers }?: {
        cancelOthers?: boolean | undefined;
        responsiveArea?: null | undefined;
    });
    updateTouch(touch: Touch): {
        didHit: boolean;
        cancelOthers?: undefined;
    } | {
        didHit: boolean;
        cancelOthers: boolean;
    };
    onUpdateTouch(touch: Touch): boolean;
    endTouchLoop(): void;
    onEndTouch(): void;
    setVisibility(t: boolean): void;
}
declare class TouchResponseArea {
    cancelWhenLeaving: boolean;
    constructor(t?: boolean);
    testTouchInResponsiveArea(t: Touch): boolean;
}
declare class TouchJoystick extends TouchControl {
    currentValue: Vector2;
    hideWhenUsed: boolean;
    containerPos: Vector2;
    defaultPos: Vector2;
    stickEl: HTMLDivElement;
    lastIsTouchingValue: boolean;
    lastIsTouchingToggleTime: number;
    doubleTapped: boolean;
    constructor({ defaultPos, hideWhenUsed, responsiveArea, lockPosAtEnd, }?: {
        defaultPos?: Vector2 | undefined;
        hideWhenUsed?: boolean | undefined;
        lockPosAtEnd?: boolean | undefined;
        responsiveArea?: null | undefined;
    });
    onUpdateTouch(t: Touch): boolean;
    onEndTouch(): void;
    onIsTouchingChange(t: boolean): void;
    setOpacity(t: number): void;
    setDefaultPos(t: Vector2): void;
    resetPos(): void;
    setPos(pos: Vector2): void;
    setStickPos(stickPos: Vector2): void;
}
declare class TouchLookInput extends TouchControl {
    currentTouchId: number | null;
    prevTouchPos: Vector2;
    lastDeltaPos: Vector2;
    constructor();
    onUpdateTouch(touch: Touch): boolean;
    onEndTouch(): void;
}
declare class TouchButton extends TouchControl {
    left: number | null;
    right: number | null;
    top: number | null;
    bottom: number | null;
    radius: number;
    linkedInputKeys: Set<InputKey>;
    pressed: boolean;
    constructor(opts?: {
        left?: number | null;
        right?: number | null;
        top?: number | null;
        bottom?: number | null;
        radius?: number;
        responsiveArea?: TouchControlArea | null;
        img?: string | null;
        cancelOthers?: boolean;
    });
    updatePosition(): void;
    updateResponsiveAreaPos(): void;
    onUpdateTouch(touch: Touch): boolean;
    onEndTouch(): void;
    setPressed(pressed: boolean): void;
    setPressedClass(): void;
    setVisibility(visible: boolean): void;
    addInputKey(inputKey: InputKey): void;
}
declare class TouchControls {
    touchListener: HTMLDivElement;
    uiContainer: HTMLDivElement;
    joyStick: TouchJoystick | null;
    lookInput: TouchLookInput | null;
    jumpButton: TouchButton | null;
    fireButton: TouchButton | null;
    toggleWeaponButton: TouchButton | null;
    chatButton: TouchButton | null;
    playerListButton: TouchButton | null;
    thirdPersonButton: TouchButton | null;
    touchElements: TouchControl[];
    smallCornerButtons: TouchButton[];
    lastDeltaLook: Vector2;
    lastUpdateTouchesTime: number;
    touchSupported: boolean;
    onTouchSupportedChangeCbs: Set<() => void>;
    onTouchListenerClickCbs: Set<() => void>;
    constructor(t: HTMLElement);
    init(): void;
    updateUiVisibility(): void;
    get joyStickValue(): Vector2;
    onResize(): void;
    onTouchSupportedChange(t: () => void): void;
    removeOnTouchSupportedChange(t: () => void): void;
    visibileTouchElements(): Generator<TouchControl, void, unknown>;
    updateTouches(e: TouchEvent): void;
    loop(t: number, e: number): void;
    afterLoop(): void;
    onTouchListenerClick(t: () => void): void;
    updateCursorVisibility(): void;
}
declare class InputManager {
    keys: Map<string, InputKey>;
    desiredPointerLockedState: boolean;
    forceUnlockedPointer: boolean;
    currentLockedKeys: string;
    mouseIsOnDocument: boolean;
    lastWheelEventTime: number;
    wheelMoveAmount: number;
    lastFiredWheelButtonTime: number;
    recentWheelButtonCount: number;
    _lastPointerLockChangeByApplicationTime: number;
    stickDeadZone: number;
    gamepadLookSensivity: number;
    touch: TouchControls;
    mouseMove: Vector2;
    walkInput: Vector2;
    lookInput: Vector2;
    gamepadAxes: Vector2[];
    onPointerLockChangeCbs: Set<(pointerLocked: boolean, userInitiated: boolean) => void>;
    onDesiredPointerLockChangeCbs: Set<(desired: boolean) => void>;
    constructor(t: HTMLElement);
    init(): void;
    loop(t: number, e: number): void;
    updateGamepadStates(t: number, e: number): void;
    get pointerLocked(): boolean;
    inputHasFocus(): boolean | null;
    setKeyCodePressed(t: KeyboardEvent, e: boolean): void;
    setMouseButtonPressed(t: number, e: boolean): void;
    fireWheelButton(t: string): void;
    setPressedGamepadButtons(t: number[]): void;
    unpressAll(): void;
    updateAxisInputs(): void;
    getKey(key: string): InputKey;
    updateKeyboardLock(): Promise<void>;
    unlockPointer(): void;
    onPointerLockChange(t: (locked: boolean, userInitiated: boolean) => void): void;
    onDesiredPointerLockChange(t: (locked: boolean) => void): void;
    updateDesiredPointerLockedState(): void;
    _updatePointerLockedState(): void;
    _tryLockPointer(): Promise<void>;
}
export interface ListedMapConfig {
    name?: string;
    assetName?: string;
    hash: string;
    size?: number;
    label?: string;
    hiddenInUi?: boolean;
    access?: string;
    thumbLayers?: number[];
    alternativeMaps?: string[];
    [key: string]: unknown;
}
export interface MapsConfigData {
    mainMenuMapHash: string;
    maps: ListedMapConfig[];
    lastUpdatedTimestamp: number;
}
export interface ShopConfigData {
    purchasableItems: ShopItemConfig[];
    skinPresets: SkinData[];
}
export interface PromosConfigData {
    activePromos: PromoItem[];
}
declare abstract class ConfigLoaderBase<T> {
    configManager: ConfigManager;
    configPath: string;
    onConfigChangeCbs: Set<(configData: T) => void>;
    loadedConfigData: T | null;
    constructor(configManager: ConfigManager, configPath: string);
    abstract transformData(t: any): T;
    load(): Promise<void>;
    onConfigChange(cb: (config: T) => void, triggerNow?: boolean): void;
    removeOnConfigChange(t: any): void;
    waitForConfigLoad(): Promise<void>;
}
declare class MapsConfig extends ConfigLoaderBase<MapsConfigData> {
    transformData(t: any): MapsConfigData;
    getListedMapConfigByHash(hash: string): ListedMapConfig | null;
    hasListedMapConfigByHash(hash: string): boolean;
    getListedMapConfigByAssetName(assetName: string): ListedMapConfig | null;
}
declare class PromosConfig extends ConfigLoaderBase<PromosConfigData> {
    transformData(t: any): PromosConfigData;
}
declare class ShopsConfig extends ConfigLoaderBase<ShopConfigData> {
    transformData(t: any): ShopConfigData;
    getPurchaseableItem(id: string): ShopItemConfig | null;
}
declare class ConfigManager {
    gameWrapper: HTMLElement;
    basePath: string | null;
    suppressLogs: boolean;
    shopConfig: ShopsConfig;
    promosConfig: PromosConfig;
    mapsConfig: MapsConfig;
    allConfigs: (MapsConfig | PromosConfig | ShopsConfig)[];
    constructor(gameWrapper: HTMLElement);
    init(): void;
    loadAllConfigs(): void;
}
interface SpawnPosition {
    index: number;
    pos: Vector3;
    rot: Quaternion;
}
declare class OfflineGame {
    physics: PhysicsManager;
    hingeManager: HingeManager;
    arrowManager: ArrowManager;
    crosshair: Crosshair;
    destructed: boolean;
    receivedColliders: boolean;
    scene: Object3D | null;
    gameIsVisible: boolean;
    onGameIsVisibleCbs: Set<() => void>;
    onSdkGameplayStartedChangeCbs: Set<() => void>;
    prevSdkGameplayStarted: boolean;
    myPlayer: Player;
    boundUpdateUiVisible: () => void;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    loadMap(): void;
    setMapScene(scene: Object3D): void;
    get gameStarted(): boolean;
    get gameEnded(): boolean;
    get sdkGameplayStarted(): boolean;
    onSdkGameplayStartedChange(cb: () => void): void;
    updateSdkGameplayStarted(): void;
    loop(now: number, dt: number): void;
    onMyPlayerChange(cb: () => void): void;
    getMyPlayer(): Player;
    getSpawnPosition(): SpawnPosition;
    getArrowAssetName(): string;
    updateGameIsVisible(): void;
    onGameIsVisible(cb: () => void): void;
    updateUiVisible(): void;
    setUiVisible(t: boolean): void;
}
type Game = OfflineGame | OnlineGame;
export declare class GameManager {
    gameWrapper: HTMLElement;
    activeGame: Game | null;
    loadingBackgroundGame: OnlineGame | null;
    joinedOnce: boolean;
    isInGamesLoop: boolean;
    onIsInGamesLoopChangeCbs: Set<(isInGamesLoop: boolean) => void>;
    onActiveGameChangeCbs: Set<(game: Game | null) => void>;
    readyToJoin: boolean;
    onReadyToJoinChangeCbs: Set<(readyToJoin: boolean) => void>;
    onGameEndCbs: Set<() => void>;
    windSfx?: SFXSound | null;
    waterSfx?: SFXSound | null;
    birdsSfx?: SFXSound | null;
    jungleSfx?: SFXSound | null;
    rainSfx?: SFXSound | null;
    insectsSfx?: SFXSound | null;
    constructor(gameWrapper: HTMLElement);
    init(): Promise<void>;
    loadWindSfx(): Promise<void>;
    loadWaterSfx(): Promise<void>;
    loadBirdsSfx(): Promise<void>;
    loadJungleSfx(): Promise<void>;
    loadRainSfx(): Promise<void>;
    loadInsectsSfx(): Promise<void>;
    setAmbientVolumes(windVolume: number, waterVolume: number, birdsVolume: number, jungleVolume: number, rainVolume: number, insectsVolume: number): void;
    onActiveGameChange(cb: (game: Game | null) => void): void;
    removeOnCurrentGameChange(cb: (game: Game | null) => void): void;
    fireCurrentGameChangeCbs(): void;
    onIsInGamesLoopChange(cb: (isInGamesLoop: boolean) => void): void;
    setIsInGamesLoop(isInGamesLoop: boolean): void;
    loop(now: number, dt: number): void;
    prepareMatchMaking(readyQueue: boolean): Promise<void>;
    loadOfflineRoamingGame(): void;
    joinedGameId(t: any): void;
    onGameEnd(cb: () => void): void;
    setJoinedOnce(): void;
    getOnlineGame(): OnlineGame;
    connectionClosed(): void;
    destroyCurrentGame(): void;
    joinIfNotJoined(t?: boolean): {
        didShowSquadDialog: boolean;
    };
    checkExistingGameAndJoin(): Promise<boolean>;
    joinGameWithoutAd(): void;
    joinGameAfterAd(): Promise<void>;
    estimateMaxWaitTimeSeconds(): number;
    getMyTeamColor(): {
        colors: (typeof teamData)[number];
        myTeamId: number;
    };
    updateSdkGameplayStarted(): void;
    onReadyToJoinChange(cb: (readyToJoin: boolean) => void): void;
    removeOnReadyToJoinChange(cb: (readyToJoin: boolean) => void): void;
    setReadyToJoin(readyToJoin: boolean): void;
}
interface RecentGameData {
    lastConnectedTimestamp: number;
    socketAddress: string;
    reconnectToken: string;
}
declare class RecentGameTracker {
    indexedDb: IndexedDB;
    isLoadingStats: boolean;
    recentGameData: RecentGameData | null;
    loadStatsPromise: Promise<void>;
    ignoreCurrentRecentGameData: boolean;
    constructor(indexedDb: IndexedDB);
    loadStats(): Promise<void>;
    getReconnectData(): Promise<{
        socketAddress: string;
        reconnectToken: string;
    } | null>;
    setRecentGameNetworkData(t: any): void;
    temporaryClearRecentGameNetworkData(): void;
    updateConnectedTimestamp(): void;
    saveStats(): void;
}
declare class GameCamera {
    gameWrapper: HTMLElement;
    baseFov: number;
    cam: PerspectiveCamera;
    isDoingLobbyShots: boolean;
    prevHasPlayer: boolean;
    lobbyCamPositions: {
        posA: number[];
        rotA: number[];
        posB: number[];
        rotB: number[];
    }[] | null;
    hasDoneFirstLobbyShot: boolean;
    currentLobbyShot: {
        posA: number[];
        rotA: number[];
        posB: number[];
        rotB: number[];
    } | null;
    currentLobbyShotT: number;
    currentLobbyShotDuration: number;
    thirdPersonMode: string;
    onThirdPersonChangeCbs: Set<() => void>;
    thirdPersonPhysicsNeedsReset: boolean;
    thirdPersonPhysics: SpringVector3;
    thirdPersonOffsetPhysics: SpringVector3;
    constructor(gameWrapper: HTMLElement);
    init(): void;
    onResize(): void;
    loop(t: number, i: number): void;
    computeLobbyShotDuration(): 10000 | undefined;
    playerRespawned(): void;
    get fov(): number;
    get fovOffset(): number;
    get rot(): Quaternion;
    get pos(): Vector3;
    get thirdPerson(): boolean;
    setLobbyCamPositions(t: {
        posA: number[];
        rotA: number[];
        posB: number[];
        rotB: number[];
    }[]): void;
    getRayCastCache(t: Vector3, e: number): RayCastCache | null;
    setThirdPersonMode(t: string): void;
    onThirdPersonChange(t: () => void): void;
    removeOnThirdPersonChange(t: () => void): void;
}
interface HudIconParams {
    size?: number;
    url?: string;
    nearest?: boolean;
}
declare class HudIcon {
    manager: HudIcons;
    size: number;
    nearest: boolean;
    currentTextureSymbol: symbol | null;
    visible: boolean;
    texture: Texture | null;
    mat: ShaderMaterial;
    obj: Mesh<PlaneGeometry, ShaderMaterial>;
    constructor(manager: HudIcons, { size, url, nearest }: HudIconParams);
    destructor(): void;
    updateIconSize(height: number, width: number): void;
    setPos(pos: Vector3): void;
    setColor(color: Color): void;
    setVisibility(visible: boolean): void;
    updateVisibility(): void;
    disposeTexture(): void;
    setUrl(url: string): void;
}
declare class HudIcons {
    globalVisibility: boolean;
    geo: PlaneGeometry;
    mat: ShaderMaterial;
    createdIcons: Set<HudIcon>;
    constructor();
    onResize(): void;
    createIcon(icon: HudIconParams): HudIcon;
    removeIcon(t: HudIcon): void;
    setGlobalVisibility(globalVisibility: boolean): void;
}
declare class ScreenFlash {
    scene: Scene;
    material: ShaderMaterial;
    autoFade: boolean;
    obj: Mesh;
    creationTime: number;
    shouldBeDestroyed: boolean;
    constructor(scene: Scene, material: Material, i: number, s: number, n: number, o: boolean, a: boolean);
    destructor(): void;
    loop(t: number): void;
    set opacity(t: number);
    set baseOpacity(t: number);
}
declare class ScreenFlashManager {
    scene: Scene;
    camera: PerspectiveCamera;
    material: ShaderMaterial | null;
    createdFlashes: Set<ScreenFlash>;
    constructor(scene: Scene, camera: PerspectiveCamera);
    setMaterial(material: ShaderMaterial): void;
    flash({ arrowHitNormalWorld, vignetteAmount, color, autoFade, hasDirection, }?: {
        arrowHitNormalWorld?: Vector3 | null;
        vignetteAmount?: number;
        color?: Vector3;
        autoFade?: boolean;
        hasDirection?: boolean;
    }): ScreenFlash | undefined;
    getThetaFromArrowHitNormal(t?: Vector3 | null): number;
    loop(now: number): void;
}
interface RenderViewOptions {
    /** @default 100 */
    width?: number;
    /** @default 100 */
    height?: number;
}
declare class RenderView {
    dirty: boolean;
    alwaysDirty: boolean;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    onNextFrameRenderCbs: Set<() => void>;
    scene: Scene | null;
    cam: PerspectiveCamera | null;
    constructor({ width, height }?: {
        height?: number | undefined;
        width?: number | undefined;
    });
    setSize(width: number, height: number): void;
    setRenderObjects(scene: Scene, cam: PerspectiveCamera, dirty?: boolean): void;
    markDirty(): void;
    get needsRender(): boolean;
    render(renderer: WebGLRenderer, width: number, height: number): void;
    waitForFrameRender(): Promise<void>;
    /** takes a screenshot of the canvas and returns it as a blob */
    getBlob(): Promise<Blob>;
}
interface RenderOverlayOptions {
    /** @default 0 */
    minFov?: number;
    /** @default 180 */
    maxFov?: number;
    /** @default 0.0 */
    near?: number;
    /** @default 100 */
    far?: number;
}
declare class RenderOverlay {
    scene: Scene;
    cam: PerspectiveCamera;
    minFov: number;
    maxFov: number;
    near: number;
    far: number;
    enabled: boolean;
    constructor({ minFov, maxFov, near, far }?: RenderOverlayOptions);
    updateProjectionMatrix(): void;
}
declare class GameRenderer {
    gameWrapper: HTMLElement;
    renderer: WebGLRenderer | null;
    canvas: HTMLCanvasElement | null;
    freezeFrameCanvas: HTMLCanvasElement | null;
    freezeFrameCtx: CanvasRenderingContext2D | null;
    freezeFrameDirty: boolean;
    webglCreationFailed: boolean;
    afterFrameRenderCbs: {
        cb(): void;
        waitCount: number;
    }[];
    /** unused */
    onBeforeRenderCbs: Set<unknown>;
    renderViews: Set<RenderView>;
    renderOverlays: Set<RenderOverlay>;
    mainCanvasRenderEnabled: boolean;
    renderWorthyEventEndTime: number;
    queriedScreenshotCallbacks: ((screenshot: Blob) => void)[];
    renderWidth: number;
    renderHeight: number;
    rawResolutionMultiplier: number;
    lastFpsStatUpdateTime: number;
    framesPassedSinceLastStatUpdate: number;
    constructor(gameWrapper: HTMLElement);
    init(): void;
    reloadRenderer(): void;
    updateSmoothFiltering(): void;
    get resolutionMultiplier(): number;
    onResize(): void;
    setSize(t: number, e: number): void;
    createRenderView(opts: RenderViewOptions): RenderView;
    removeRenderView(view: RenderView): void;
    createRenderOverlay(opts?: RenderOverlayOptions): RenderOverlay;
    removeRenderOverlay(t: RenderOverlay): void;
    queryScreenshot(): Promise<unknown>;
    loop(t: number, e: number): void;
    renderWorthyEventHappened(t?: number): void;
    updateMainCanvasRenderEnabled(): void;
    setMainCanvasRenderEnabled(t: boolean): void;
    get needsRenderFrame(): boolean;
    renderCameras(): void;
    waitForFrameRender(waitCount?: number): Promise<void>;
}
declare class SkeletonsManager {
    cachedPoses: Map<string, Object3D>;
    loadingPoseCbs: Map<string, Set<(value: Object3D) => void>>;
    constructor();
    getSkeleton(name: string, { clone, signal }?: {
        clone?: boolean;
        signal?: AbortSignal | null;
    }): Promise<Object3D>;
}
export interface SfxOpts {
    name?: string;
    autoPlay?: boolean;
    volume?: number;
    minPitch?: number;
    maxPitch?: number;
    volumeFront?: number;
    volumeBack?: number;
    isMusic?: boolean;
    loop?: boolean;
    allowWithoutUserEvent?: boolean;
    overrideMute?: boolean;
    pos?: Vector3 | null;
    connectToDestination?: boolean;
    [key: string]: unknown;
}
declare class Sound {
    opts: SfxOpts;
    ctx: AudioContext;
    loaded: boolean;
    loading: boolean;
    buffer: AudioBuffer | null;
    onLoadCbs: (() => void)[];
    constructor(opts: SfxOpts, ctx: AudioContext);
    init(): Promise<void>;
    waitForLoad(): Promise<void>;
    getBuffer(): Promise<AudioBuffer | null>;
}
declare class SFXSound {
    cachedSfx: Sound;
    opts: SfxOpts;
    destructed: boolean;
    sourceNode: AudioBufferSourceNode | null;
    gainNode: GainNode | null;
    frontGainNode: GainNode | null;
    frontSplitterNode: ChannelSplitterNode | null;
    backGainNode: GainNode | null;
    backSplitterNode: ChannelSplitterNode | null;
    channelMergerNode: ChannelMergerNode | null;
    finalNode: AudioNode | null;
    pannerNode: PannerNode | null;
    preventDestructOnNextStop: boolean;
    lastSetVolume: number;
    isLoopPlaying: boolean | null;
    muted: boolean;
    forceMuted: boolean;
    startTime: number;
    pitch: number;
    constructor(cachedSfx: Sound, params?: Partial<SfxOpts>);
    destructor(): void;
    init(): Promise<boolean | undefined>;
    setVolume(t: number, e?: boolean): void;
    volumeSettingChanged(t: string): void;
    setMuted(t: boolean, e?: boolean): void;
    start(t?: boolean): Promise<void>;
    stop(destruct?: boolean): void;
    pause(_?: boolean): void;
    resume(muted?: boolean): void;
    getEstimatedTime(): number;
}
declare class SoundFX {
    static supported: boolean;
    supported: boolean;
    packageName: `sfx${string}`;
    cachedSfx: {
        [k: string]: Sound;
    };
    createdSfx: SFXSound[];
    settingsMuted: boolean;
    adsMuted: boolean;
    muted: boolean;
    ctx?: AudioContext;
    boundUserEvent?: () => Promise<void>;
    addedUserEventListeners?: boolean;
    soundsConfig: ({
        name: string;
        volume: number;
        minPitch?: undefined;
        maxPitch?: undefined;
        isMusic?: undefined;
        loop?: undefined;
    } | {
        name: string;
        volume: number;
        minPitch: number;
        maxPitch: number;
        isMusic?: undefined;
        loop?: undefined;
    } | {
        minPitch?: undefined;
        maxPitch?: undefined;
        name: string;
        volume: number;
        isMusic: boolean;
        loop?: undefined;
    } | {
        minPitch?: undefined;
        maxPitch?: undefined;
        name: string;
        volume: number;
        loop: boolean;
        isMusic: boolean;
    } | {
        minPitch?: undefined;
        maxPitch?: undefined;
        isMusic?: undefined;
        name: string;
        volume: number;
        loop: boolean;
    })[] | undefined;
    ctxStatePossiblyInvalid: boolean | undefined;
    constructor();
    static _audioFormat: string | null;
    static _audioFormatSet: boolean;
    static get audioFormat(): string;
    static get audioFormatCamelCase(): string | null;
    init(): void;
    downloadPackage(): Promise<void>;
    loop(now: number, dt: number): void;
    onCtxStatechange(): void;
    addUserEventListeners(): void;
    removeUserEventListeners(): void;
    userEvent(): Promise<void>;
    playSound(name: string, params?: object): Promise<SFXSound | null | undefined>;
    setMutedSettings(muted: boolean): void;
    setMutedAds(muted: boolean): void;
    updateMuted(): void;
    sfxDestructed(sfx: SFXSound): void;
}
declare class Waiter<const F extends (...a: Args) => Promise<R>, const Args extends unknown[], const R> {
    promiseFn: F;
    once: boolean;
    _queue: {
        resolve(value: R): void;
        args: Args;
    }[];
    _isEmptyingQueue: boolean;
    hasRun: boolean;
    _onceReturnValue: R | undefined;
    _onFinishCbs: Set<() => void>;
    constructor(promiseFn: F, { once }?: {
        once?: boolean | undefined;
    });
    run(...args: Args): Promise<R | undefined>;
    _emptyQueue(): Promise<void>;
    waitForFinish(): Promise<void>;
    waitForFinishIfRunning(): Promise<void>;
}
declare class MatchMaking {
    matchMakingSocketUrl: string;
    ws: WebSocket | null;
    onJoinServerReceivedCbs: Set<(game: JoinedGameInfo) => void>;
    nextCloseIsIntentional: boolean;
    onConnectionCloseCbs: Set<(nextIsIntentional: boolean) => void>;
    onConnectionOpenCbs: Set<() => void>;
    onConnectionCloseDuringMatchMakingCbs: Set<() => void>;
    onSquadMessageCbs: Set<(message: SquadMessage) => void>;
    onIsMatchMakingChangeCbs: Set<() => void>;
    matchMakingLoadingText: InfoText | null;
    isMatchMaking: boolean;
    shouldApplyLoadingText: boolean;
    isInUnreadyQueue: boolean;
    lastSentElo: number;
    initConnectionInstance: Waiter<() => Promise<boolean>, [], boolean>;
    constructor();
    init(): void;
    setIsMatchMaking(isMatchMaking: boolean): void;
    setShouldApplyLoadingText(shouldApply: boolean): void;
    updateLoadingText(): void;
    initConnection(): Promise<boolean | undefined>;
    assertInitConnection(): Promise<void>;
    get connected(): boolean | null;
    attemptSingleWsConnection(): Promise<WebSocket | null>;
    closeMatchMakingConnection(): void;
    markNextCloseAsIntentional(): void;
    fireOnCloseCbs(): void;
    updateQueueState({ isReadyToJoin, maxWaitTimeMs, }?: {
        isReadyToJoin?: boolean;
        maxWaitTimeMs?: number;
    }): Promise<void>;
    leaveQueue(): Promise<void>;
    onConnectionOpen(cb: () => void): void;
    onConnectionClose(cb: (nextIsIntentional: boolean) => void): void;
    onConnectionCloseDuringMatchMaking(cb: () => void): void;
    onIsMatchMakingChange(cb: () => void): void;
    send(message: Record<string, unknown>): void;
    sendDownloadedMapHashes(): void;
    sendEntitlementsProof(): Promise<void>;
    sendElo(): void;
    sendPreferredGamemodes(): void;
    onJoinServerReceived(cb: (game: JoinedGameInfo) => void): void;
    sendRequestSquadId(): Promise<void>;
    sendJoinSquad(squadId: string, allowJoinExistingGame: boolean, allowCreate: boolean): Promise<void>;
    onSquadMessage(cb: (message: SquadMessage) => void): void;
    sendSquadSettingChange(setting: string, value: SettingValue): void;
    sendAllSquadSettings(settings: SquadSettings): void;
    sendSquadTeamColor(memberId: number, teamColorId: number): void;
    sendUsername(username: string): void;
    sendStartSquad(): void;
    sendAllowAutoStartSquad(): void;
    sendRequestSquadLeadership(token: string): void;
    sendMySkinData(skinData: string): void;
}
export interface JoinedGameInfo {
    gameId: number;
    joinRequestId?: string;
    isLocal?: boolean;
    insecure?: boolean;
    url4?: string;
    [key: string]: unknown;
}
export interface SquadPlayer {
    id: number;
    squadPlayerId: number;
    name: string;
    teamId: number;
    skinData: SkinData;
    leader: boolean;
}
export interface SquadSettings {
    privateSquad?: boolean;
    [key: string]: unknown;
}
export interface MatchMakeSquadMember {
    name: string;
    skinData: SkinData;
    ready: boolean;
    leader: boolean;
    configuredTeamColor: number;
}
export interface SquadMemberData {
    id: number;
    myPlayer?: boolean;
    name: string;
    skinDataStr?: string;
    ready?: boolean;
    leader?: boolean;
    configuredTeamColor?: number;
    [key: string]: unknown;
}
export interface SquadMessage {
    op: string;
    squadId?: string;
    willJoinImmediately?: boolean;
    errorType?: string;
    settings?: SquadSettings;
    setting?: string;
    value?: unknown;
    token?: string;
    isLeader?: boolean;
    members?: SquadMemberData[];
    member?: SquadMemberData;
    id?: number;
    readyForStart?: boolean;
    started?: boolean;
}
declare class SquadManager {
    networkManager: NetworkManager;
    matchMakeManager: MatchMaking;
    gameManager: GameManager;
    isJoiningSquad: boolean;
    matchmakeServerSquadId: string | null;
    gameServerSquadId: string | null;
    onBeforeJoinFired: boolean;
    lastSentUsername: string | null;
    lastSentSkinDataStr: string | null;
    shouldShowSquadDialogForCurrentSquadId: boolean;
    matchMakeSquadMembers: Map<number, MatchMakeSquadMember>;
    matchMakeSquadMembersOnGameJoin: Map<number, MatchMakeSquadMember>;
    includeUnjoinedMembers: boolean;
    includeUnjoinedMembersTimeout: Timeout;
    waitingForSquadLoadingText: InfoText | undefined;
    waitingForSquadStartLoadingText: InfoText | undefined;
    gameSquadPlayers: SquadPlayer[];
    mySquadPlayerId: number;
    matchMakeAllReady: boolean;
    serverReadyForStartState: boolean;
    onServerReadyForStartStateChangeCbs: Set<() => void>;
    onServerReadyForStartTrueCbs: Set<() => void>;
    clientStartClicked: boolean;
    clientStartClickedTimeout: Timeout;
    serverStartClicked: boolean;
    startClicked: boolean;
    onStartClickedChangeCbs: Set<() => void>;
    prevUserVisibleSquadId: string | null;
    onUserVisibleSquadIdChangeCbs: Set<(userVisibleSquadId: string) => void>;
    onIsJoiningSquadChangeCbs: Set<() => void>;
    onSquadMembersChangeCbs: Set<() => void>;
    currentSquadSettings: SquadSettings | null;
    beforeMatchmakeConnectSquadSettings: SquadSettings | null;
    myClientIsSquadLeader: boolean;
    lastSquadLeaderToken: string | null;
    onSquadSettingChangeCbs: Set<(setting: string, value: SettingValue) => void>;
    onMySquadLeaderStateChangeCbs: Set<() => void>;
    boundUpdateGameSquadPlayers: () => void;
    constructor(networkManager: NetworkManager, matchMakeManager: MatchMaking, gameManager: GameManager);
    init(): void;
    get userVisibleSquadId(): string | null;
    get isInSquad(): boolean;
    get startButtonEnabled(): boolean;
    updateGameSquadPlayers(): void;
    getSquadMembers(): Generator<{
        gameServerId: number;
        matchmakeServerId: null;
        name: string;
        teamId: number;
        ready: boolean;
        joined: boolean;
        skinData: SkinData;
        leader: boolean;
    } | {
        gameServerId: null;
        matchmakeServerId: null;
        name: string;
        teamId: number;
        ready: boolean;
        joined: boolean;
        skinData: SkinData;
        leader: boolean;
    } | {
        gameServerId: null;
        matchmakeServerId: number;
        name: string;
        teamId: number;
        ready: boolean;
        joined: boolean;
        skinData: SkinData;
        leader: boolean;
    }, void, unknown>;
    get totalSquadMemberCount(): number;
    setSquadSetting(t: string, e: SettingValue): void;
    onSquadSettingChange(t: (setting: string, value: SettingValue) => void): void;
    removeOnSquadSettingChange(t: (setting: string, value: SettingValue) => void): void;
    setConfiguredTeamColor(t: number, e: number): void;
    onMySquadLeaderStateChange(t: () => void): void;
    removeOnMySquadLeaderStateChange(t: () => void): void;
    sendCurrentUsername(): void;
    sendMySkinIds(): void;
    setMyClientIsSquadLeader(t: boolean): void;
    setIsJoiningSquad(t: boolean): void;
    requestInitialSquadId(): Promise<void>;
    handleSquadJoinError(errorType: string, squadId?: string | null): void;
    joinExistingSquad(t: string, e?: boolean, i?: boolean): Promise<undefined>;
    setMatchmakeServerSquadId(t: string | null): void;
    setGameServerSquadId(t: string | null): void;
    addRecentSquadId(t: string): void;
    squadIdReceivedFromGameServer(t: string): void;
    onUserVisibleSquadIdChange(t: (userVisibleSquadId: string) => void): void;
    removeOnUserVisibleSquadIdChange(t: (userVisibleSquadId: string) => void): void;
    updateUserVisibleSquadId(): void;
    updateLoadingText(): void;
    updateStartClicked(): void;
    joinSquadFromCurrentHash(t?: boolean): void;
    startSquad(): void;
    onIsJoiningSquadChange(t: () => void): void;
    removeOnIsJoiningSquadChange(t: () => void): void;
    onSquadMembersChange(t: () => void): void;
    removeOnSquadMembersChange(t: () => void): void;
    onServerReadyForStartStateChange(t: () => void): void;
    removeOnServerReadyForStartStateChange(t: () => void): void;
    waitForServerReadyForStart(): Promise<void>;
    onStartClickedChange(t: () => void): void;
    removeOnStartClickedChange(t: () => void): void;
    updateSquadMembersData(): void;
}
export interface WorldBounds {
    minX: number;
    minY: number;
    minZ: number;
    maxX: number;
    maxY: number;
    maxZ: number;
}
export interface CreatedArrow {
    arrowId: number;
    pos: Vector3;
    dir: Vector3;
    fireAmount01: number;
    networkOffsetPos: Vector3;
}
export declare class NetworkManager {
    ws: WebSocket | null;
    joiningLoadingText: InfoText | null;
    lastReceiveMessageTime: number;
    connectionOpenedAndDataSent: boolean;
    onConnectionOpenCbs: Set<() => void>;
    onNextConnectionOpenCbs: Set<() => void>;
    onConnectionClosedCbs: Set<(nextIsIntentional: boolean, lastDisconnectReason: number) => void>;
    onSquadJoinErrorCbs: Set<(err: string | null) => void>;
    onBeforeConnectGameServerCbs: Set<() => void>;
    lastSentSkinData: string;
    lastSentSessionData: string;
    lastDisconnectReason: number;
    lastDisconnectReasonExtra: number[];
    nextCloseIsIntentional: boolean;
    isInitialPageLoadConnection: boolean;
    timeoutDialog: AlertDialog | null;
    nextJoinReconnectToken: string | null;
    nextJoinGameId: number;
    nextJoinRequestId: string | null;
    matchMaking: MatchMaking;
    squadManager: SquadManager;
    isInit: boolean;
    onInitCbs: Set<() => void>;
    constructor(gameManager: GameManager);
    init(): Promise<void>;
    waitForInit(): Promise<void>;
    get shouldUseMatchMaking(): boolean;
    static getLocalGameServerUrl(): string;
    checkInitialPageloadConnection(): Promise<boolean>;
    prepareJoinGame(): Promise<undefined>;
    closeCurrentConnection(t?: boolean, e?: boolean): void;
    connect(url: string, { isInitialPageLoadConnection }?: {
        isInitialPageLoadConnection?: boolean | undefined;
    }): Promise<void>;
    onMessage({ buffer }: {
        buffer: ArrayBufferLike;
    }): void;
    markNextCloseAsIntentional(): void;
    fireConnectionClosed(): void;
    onOpen(): void;
    waitForConnectionOpen(): Promise<unknown>;
    clearNextJoinData(): void;
    onConnectionOpen(t: () => void): void;
    onNextConnectionOpen(t: () => void): void;
    onConnectionClosed(t: (nextIsIntentional: boolean, lastDisconnectReason: number) => void): void;
    onSquadJoinError(t: (err: string | null) => void): void;
    onBeforeConnectGameServer(t: () => void): void;
    get hasGameServerConnection(): boolean | null;
    showAfkKickAlert(): Promise<undefined>;
    send(t: Uint32Array<ArrayBuffer> | Uint8Array<ArrayBuffer> | ArrayBuffer | number[]): true | undefined;
    sendStringMessage(t: number, e: string): void;
    sendJsonMessage(id: number, data: unknown): void;
    sendCurrentVersion(): void;
    sendMySkinData(data: SkinData): void;
    sendJoinReconnectToken(t: string): void;
    sendJoinGameId(gameId: number, e?: string | null): void;
    sendPlayerData(t: OnlineGame, e: number, { posX, posY, posZ, rotX, rotY }?: {
        posX?: number | undefined;
        posY?: number | undefined;
        posZ?: number | undefined;
        rotX?: number | undefined;
        rotY?: number | undefined;
    }): void;
    getWorldBounds(game: OnlineGame | OfflineGame | null): WorldBounds;
    getDefaultFlagNetworkPositions(game: OnlineGame): Generator<[number, number, number]>;
    getDefaultSpawnNetworkPositions(game: OnlineGame): [number, number, number][][] | null;
    getKingOfTheHillNetworkPosition(game: OnlineGame): [number, number, number];
    mapWorldPosToNetworkPos(game: OnlineGame, x: number, y: number, z: number): [number, number, number];
    mapNetworkPosToWorldPos(game: OnlineGame, x: number, y: number, z: number): [number, number, number];
    mapNetworkVelocityToWorldVelocity(x: number, y: number, z: number): [number, number, number];
    sendCreateArrow(game: OnlineGame, playerId: number, { arrowId, pos, dir, fireAmount01, }: {
        arrowId: number;
        pos: Vector3;
        dir: Vector3;
        fireAmount01: number;
    }): CreatedArrow;
    sendChangeFlag(t: number, e: number, i: number): void;
    sendCurrentLoadedMapHash(t: string): void;
    sendWorldBounds(t: OnlineGame): void;
    sendDefaultFlagPositions(t: OnlineGame): void;
    sendDefaultSpawnPositions(t: OnlineGame): void;
    sendKingOfTheHillPosition(t: OnlineGame): void;
    sendReportCheater(playerId: number, reportType: number, value: number): void;
    sendHitByArrow(t: number, e: number, i: number, s: number, n: number): void;
    sendValidArrowHit(t: number, e: number, i: number): void;
    sendChatMessage(t: string): void;
    sendRequestMapHash(t: string): void;
    sendRequestNextGameState(): void;
    sendPlayerPerformAction(playerID: number, action: number): void;
    sendRequestRespawn(t: number): void;
    sendChangeSelectedClass(t: number, e: number): void;
    sendChangeActiveWeaponType(t: number, e: boolean): void;
    sendMeleeHitPlayer(t: number, e: number, i: number): void;
    sendFlagReturnProgress(t: number, e: number): void;
    sendCurrentSession(): Promise<void>;
    sendSession(t: GameServerSessionData): void;
    sendSquadData(t: string, e: number, leaderToken: string): void;
    sendRequestSquadId(): void;
    sendSquadLeaderRequestGameExit(): void;
    sendSquadLeaderChangePlayerTeam(t: number, e: number): void;
    sendPlayerFlySetting(): void;
}
type GameServerSessionData = {
    type: string;
    token: string;
    secureId: string;
    guestData?: undefined;
} | {
    type: string;
    guestData: unknown;
    token?: undefined;
    secureId?: undefined;
};
declare class AuthManager {
    gameWrapper: HTMLElement;
    oAuthProviderConfigs: Map<any, any>;
    prevSessionNonce: string | null;
    sessionNonce: string | null;
    currentSessionData: {
        expires: number;
        secureId: string;
        token: string;
    } | null;
    currentGuestSessionData: {
        expires: number;
        secureId: string;
        token: string;
    } | null;
    openOAuthWindows: Set<Window>;
    onOAuthWindowCloseCbs: Set<() => void>;
    isHandlingAuthToken: boolean;
    onAuthTokenHandleFinishCbs: Set<(result: unknown) => void>;
    mostRecentAuthTokenHandleResult: unknown;
    onLoggedInAccountChangeCbs: Set<() => void>;
    onGuestSessionDataChangeCbs: Set<() => void>;
    lastPeliLoginCounter: number;
    guestAccountData: unknown;
    guestAccountDataSetOnce: boolean;
    loginErrorAlert: unknown;
    refreshSessionInstance: Waiter<() => Promise<void>, unknown[], unknown>;
    refreshSessionIfNeededInstance: Waiter<() => Promise<void>, unknown[], unknown>;
    syncGuestDataWithRestServiceInstance: Waiter<() => Promise<false | undefined>, unknown[], unknown>;
    currentPeliLoginMigrationFlow: {
        abort(): void;
        start(): void;
    } | null;
    peliLoginStateUpdatesDisabled: boolean;
    updatePeliSdkLoginStateInstance: Waiter<() => Promise<void>, unknown[], unknown>;
    isInit: boolean;
    onInitCbs: Set<() => void>;
    constructor(gameWrapper: HTMLElement);
    init(): Promise<void>;
    waitForInit(): Promise<void>;
    onLoggedInAccountChange(t: () => void): void;
    removeOnLoggedInAccountChange(t: () => void): void;
    fireLoggedInAccountChange(): void;
    onGuestSessionDataChange(t: () => void): void;
    showLoginDialog(t?: string): Promise<{
        error?: string;
    } | undefined>;
    showLoginDialogWithErrorHandling(): Promise<void>;
    getSessionNonce(): string;
    setPrevSessionNonce(nonce: string | null): Promise<void>;
    setPeliLoginStateUpdatesDisabled(disabled: boolean): void;
    updatePeliSdkLoginState(): void;
    createForcedPeliLogoutDialog({ title, text }: {
        title: string;
        text: string;
    }): Promise<boolean>;
    peliSdkLogin(): Promise<{
        success: boolean;
        error: string | null;
        usedPelicanParty: boolean;
    } | null>;
    createPeliSession(t?: boolean): Promise<{
        success: boolean;
        error: string | null;
        usedPelicanParty: boolean;
    }>;
    handleLinkAccountResultNotifications(t: {
        success: boolean;
        usedPelicanParty: boolean;
    } | null): void;
    getOAuthUrl(t: string, signal: AbortSignal): Promise<string | null>;
    oAuthLogin(t: string, e: AbortSignal): Promise<unknown>;
    closeOpenOAuthWindows(): void;
    handleAuthToken(t: {
        type: string;
        accessToken?: string;
        issuer?: string;
        idToken?: string;
    }, e: string, i?: boolean): Promise<void>;
    waitForAuthTokenHandleFinish(): Promise<unknown>;
    setAuthTokenBody(t: {
        type: string;
        accessToken?: string;
        issuer?: string;
        idToken?: string;
    }, e: URLSearchParams): void;
    mergeGuestDataWithLoggedInAccount(): Promise<boolean>;
    fetchAuthSessionData(t: URL, e: URLSearchParams, { fromRefreshAttempt, ignoreFailures }?: {
        fromRefreshAttempt?: boolean | undefined;
        ignoreFailures?: boolean | undefined;
    }): Promise<{
        success: boolean;
        error: null;
    } | {
        success: boolean;
        error: string;
    }>;
    handleSessionDataResponse(t: Response): Promise<void>;
    handleUnlinkRequest(t: URL, e: URLSearchParams | null, i: boolean): Promise<boolean>;
    unlinkPeliAccount(): Promise<boolean>;
    unlinkAccount(t: {
        issuer: string;
        email: string;
    }): Promise<boolean>;
    get isLoggedIn(): boolean;
    loginIfNotLoggedIn(): Promise<boolean>;
    logoutAfterError(): Promise<boolean>;
    showLoginError(t: boolean): void;
    logout(): Promise<void>;
    peliLogout(): Promise<"already-logged-out" | "dismissed" | "logged-out" | "not-supported">;
    logoutEverywhere(): Promise<void>;
    clearCurrentSessionData(): Promise<void>;
    getGuestAccountData(): Promise<unknown>;
    setGuestAccountData(t: unknown, e?: boolean): Promise<void>;
    getSessionDataForGameServer(): Promise<GameServerSessionData>;
    refreshGuestSessionIfNeeded(): Promise<boolean | undefined>;
    postGuestAccountDataToRestService(): Promise<boolean>;
    syncGuestDataWithRestService(): Promise<unknown>;
    waitForGuestDataSync(): Promise<void>;
    syncGuestDataWithRestServiceFn(): Promise<false | undefined>;
    deleteGuestAccountDataFromRestService(): Promise<boolean>;
    getRestAuthHeader(t?: boolean): Promise<string | null>;
    requestWithAuthHeader<R>(cb: (auth: string | null) => Promise<{
        gotAuthError: boolean;
        returnValue: R;
    }>): Promise<R>;
}
declare class State {
    authManager: AuthManager;
    indexedDb: IndexedDB;
    onStateChangedCbs: Set<() => void>;
    cachedStateIndexDbKey: string;
    getStateUrl: string;
    fetchCurrentDataInstance: Waiter<() => Promise<any>, unknown[], unknown>;
    stateIsStale: boolean;
    constructor(authManager: AuthManager, indexedDb: IndexedDB);
    init(): void;
    clearCurrentData(): void;
    clearAndRefetch(): void;
    saveCachedState(value: unknown): Promise<void>;
    loadCachedState(): Promise<void>;
    saveCurrentCachedState(): Promise<void>;
    markStateAsStale(): void;
    onStateChanged(cb: () => void): void;
    removeOnStateChanged(cb: () => void): void;
    fireStateChanged(): void;
    fetchCurrentData(assumeStale?: boolean): Promise<void>;
    waitForCurrentDataFetch(): Promise<void>;
    fetchCurrentDataFn(): any;
    loadStateData(t: any): void;
    getCurrentState(): {
        ownedCoins: number;
        purchasedItems: string[];
    };
    clearCurrentDataImpl(): void;
}
export interface LinkedAccount {
    issuer: string;
    email: string;
    isUnknownEmail?: boolean;
    [key: string]: unknown;
}
export interface UsernameData {
    username: string;
    protected?: boolean;
    verified?: boolean;
    [key: string]: unknown;
}
interface ProfileStateData {
    username: string | null;
    isGuest: boolean;
    stats: Record<string, number>;
    maxLinkedAccountsReached: boolean;
    protected: boolean;
    canUnlinkAllAccounts: boolean;
    canBeDeleted: boolean;
    linkedAccounts: LinkedAccount[];
    dbId: string | null;
    usernameData: UsernameData | null;
    peliAccountEmail: null;
    isPeliSession: boolean;
    canUnlinkPeliAccount: boolean;
}
declare class ProfileState extends State {
    cachedStateIndexDbKey: string;
    getStateUrl: string;
    isGuest: boolean;
    stats: Record<string, number>;
    maxLinkedAccountsReached: boolean;
    protected: boolean;
    canUnlinkAllAccounts: boolean;
    canBeDeleted: boolean;
    dbId: string | null;
    usernameData: UsernameData | null;
    peliAccountEmail: string | null;
    isPeliSession: boolean;
    canUnlinkPeliAccount: boolean;
    linkedAccounts: LinkedAccount[];
    constructor(...t: [authManager: AuthManager, db: IndexedDB]);
    getCurrentState(): ProfileStateData;
    loadStateData(t: ProfileStateData): void;
    clearCurrentDataImpl(): void;
    getUsername(): string;
    setUsername(username: string): Promise<boolean>;
    getElo(): number;
}
declare class ShopState extends State {
    #private;
    cachedStateIndexDbKey: string;
    getStateUrl: string;
    ownedCoins: number;
    purchasedItems: Set<string>;
    purchasingItemTasks: Map<string, Promise<{
        success: boolean;
        errorCode: string;
    }>>;
    constructor(...t: [auth: AuthManager, db: IndexedDB]);
    getCurrentState(): {
        ownedCoins: number;
        purchasedItems: string[];
    };
    loadStateData(t: any): void;
    clearCurrentDataImpl(): void;
    sendPurchaseItemRequest(t: any): Promise<{
        success: boolean;
        errorCode: string;
    }>;
    purchasePaidItem(purchasable: ShopItemConfig, dialogManager: DialogManager): Promise<boolean>;
    purchaseRewardedItem(purchasable: ShopItemConfig, pokiManager: Poki, dialogManager: DialogManager, placement: any): Promise<boolean>;
    purchaseItem(purchasable: ShopItemConfig, pokiManager: Poki, dialogManager: DialogManager, location: "in-menu" | "shop"): Promise<boolean>;
    getVisibleItemPrice(t: ShopItemConfig): number;
    provideNewCoinCount(newCoinCount: number): void;
    doubleLastGameCoins(): Promise<{
        success: boolean;
        error: string;
        newCoinCount: number;
    }>;
    requestCheatCoins(t: unknown): Promise<boolean>;
    isPurchasingItem(id: string): boolean;
    itemIsPurchased(id: string): boolean;
    waitForItemPurchase(id: string): Promise<void>;
}
declare class Poki {
    pokiInit: boolean;
    pokiErrored: boolean;
    pokiInitErrored: boolean;
    onPokiInitCbs: Array<() => void>;
    _usePokiSdk: boolean;
    gameplayStarted: boolean;
    loadStartCalled: boolean;
    loadFinishCalled: boolean;
    isShowingCommercialBreak: boolean;
    isShowingRewardedBreak: boolean;
    onRewardedBreakFinishCbs: Set<() => void>;
    _prevIsShowingBreak: boolean;
    onIsShowingBreakChangeCbs: Set<() => void>;
    prevVisiblePokiBanners: Set<any>;
    isPokiBuild: boolean;
    constructor(t: boolean);
    get usePokiSdk(): boolean;
    get supported(): boolean;
    get isShowingBreak(): boolean;
    init(): Promise<void>;
    waitForInit(): Promise<void>;
    gameplayStart(): Promise<void>;
    gameplayStop(): Promise<void>;
    gameLoadingStart(): Promise<void>;
    gameLoadingProgress(percentageDone: number): Promise<void>;
    gameLoadingFinished(): Promise<void>;
    peliAdsDisabled(): boolean;
    rewardedBreak({ category, details, placement }: any): Promise<{
        success: boolean;
        error: string;
    } | {
        error?: undefined;
        success: boolean;
    }>;
    rewardedBreakWithErrorDialog(t: any): Promise<boolean>;
    waitForRewardedBreakFinish(): Promise<void>;
    commercialBreak(): Promise<void>;
    updateIsShowingBreak(): void;
    onIsShowingBreakChange(t: () => void): void;
    updateBannerVisibility(): void;
    happyTime(t?: number): Promise<void>;
    get isHappyDay(): boolean;
    openExternalLink(url: string): void;
}
declare class QuantcastManager {
    init(idk: boolean): void;
}
declare class BlobURLReference {
    onDestructedCbs: Set<() => void>;
    onBlobUrlCreatedCbs: Set<(url: string) => void>;
    blobUrl: string | null;
    destructed: boolean;
    constructor();
    destructor(): void;
    onDestructed(cb: () => void): void;
    blobUrlCreated(url: string): void;
    getBlobUrl(): Promise<string>;
}
declare class Avatar {
    avatarsManager: AvatarsManager;
    config: PartAvatarConfig;
    blobUrlReferences: Set<BlobURLReference>;
    onDestructedCbs: Set<() => void>;
    blobUrl: string | null;
    createAvatarInstance: Waiter<() => Promise<void>, unknown[], unknown>;
    destructed: boolean;
    constructor(avatarsManager: AvatarsManager, config: PartAvatarConfig);
    destructor(): void;
    getBlobUrlReference(): BlobURLReference;
    onDestructed(cb: () => void): void;
}
interface SkinOpts {
    gender?: PlayerGender;
}
interface AvatarConfig {
    cameraType: string;
    width: number;
    height: number;
    backgroundColor: string;
    secondBackgroundColor?: string | null;
    backgroundAlpha: number;
    clipPathType: string;
    skeletonPoseLayers: string[];
    bow?: BowAssetConfig | null;
    skinObjectOpts: {
        teamId: number;
        skin: SkinOpts;
    };
}
type PartAvatarConfig = Partial<AvatarConfig>;
declare class AvatarsManager {
    renderer: GameRenderer;
    createdAvatars: Map<string, Avatar>;
    constructor(renderer: GameRenderer);
    fillConfigDefaults(config: PartAvatarConfig): {
        cameraType: string;
        width: number;
        height: number;
        backgroundColor: string;
        secondBackgroundColor: string | null;
        backgroundAlpha: number;
        clipPathType: string;
        skeletonPoseLayers: string[];
        bow: BowAssetConfig | null;
        skinObjectOpts: {
            teamId: number;
            skin: SkinOpts;
        };
    };
    generateAvatarBlob(config: PartAvatarConfig): Promise<{} | null>;
    configToCacheKey(config: AvatarConfig): string;
    getAvatar(config: PartAvatarConfig): Avatar;
}
declare class ClassImageReference {
    classId: string;
    classSelectionImageManager: ClassSelectionImageManager;
    _needsUpdates: boolean;
    lastBlobUrl: null;
    blobUrlChangeCbs: Set<(url: string) => void>;
    onNeedsUpdatesChangeCbs: Set<() => void>;
    constructor(classId: string, classSelectionImageManager: ClassSelectionImageManager);
    destructor(): void;
    get needsUpdates(): boolean;
    set needsUpdates(t: boolean);
    onNeedsUpdatesChange(cb: () => void): void;
    onBlobUrlChange(cb: (url: string) => void, e?: boolean): void;
    fireUrlChangeCbs(blobUrl: string): void;
}
interface BlobURLCache {
    updateReferences: Set<ClassImageReference>;
    reference: BlobURLReference | null;
    url: string | null;
    lastLoadingSym: symbol | null;
    avatarDirty: boolean;
}
declare class ClassSelectionImageManager {
    cachedBlobUrlDatas: Map<string, BlobURLCache>;
    teamId: number;
    constructor();
    init(): void;
    markAllAvatarsDirty(): void;
    loadClassBlobUrl(t: string): Promise<void>;
    createClassBlobUrl(t: string): BlobURLReference;
    setTeamId(t: number | null): void;
    getOrCreateBlobUrlData(classId: string): BlobURLCache;
    createUpdateReference(classId: string): ClassImageReference;
    removeUpdateReference(classId: string, e: ClassImageReference): void;
}
interface InfoTextOptions {
    startLoading?: boolean | undefined;
    showPercentage?: boolean | undefined;
    shouldBounce?: boolean | undefined;
    showInMainMenu?: boolean | undefined;
    priority?: number | undefined;
}
declare class InfoText {
    text: string;
    showPercentage: boolean;
    shouldBounce: boolean;
    showInMainMenu: boolean;
    priority: number;
    percentage: number;
    isLoading: boolean;
    onStateChangeCbs: Set<() => void>;
    constructor(text: string, { startLoading, showPercentage, shouldBounce, showInMainMenu, priority, }?: InfoTextOptions);
    setIsLoading(isLoading: boolean): void;
    onStateChange(cb: () => void): void;
    fireStateChange(): void;
    setShowPercentage(showPercentage: boolean): void;
    setPercentage(percentage: number): void;
    getText(): string;
}
declare class MainInfoTextManager {
    infoTextEl: HTMLElement | null;
    loadingTexts: Set<InfoText>;
    constructor();
    init(): void;
    requestInfoText(...params: [text: string, opts?: InfoTextOptions]): InfoText;
    removeInfoText(info: InfoText): void;
    updateText(): void;
}
declare class PlayerAvatarManager {
    gameLoaded: boolean;
    avatar: Avatar | null;
    avatarVisible: boolean;
    currentAvatarBlobreference: BlobURLReference | null;
    onAvatarUrlChangeCbs: Set<(url: string | null) => void>;
    currentBlobUrl: string | null;
    updateAvatarInstance: Waiter;
    constructor();
    setGameLoaded(): void;
    updateAvatarVisibility(): void;
    setAvatar(avatar: Avatar): void;
    onAvatarUrlChange(cb: (url: string | null) => void): void;
    removeOnAvatarUrlChange(cb: (url: string | null) => void): void;
}
declare class FullScreenManager {
    onFullScreenChangeCbs: Set<() => void>;
    onAutoFullScreenChangeCbs: Set<() => void>;
    constructor();
    init(): void;
    onAutoFullScreenChange(cb: () => void): void;
    hasAutoFullScreen(): SettingValue | undefined;
    updateAutoFullScreen(): void;
    suggestAutoFullScreen(): Promise<void>;
    requestFullScreen(): void;
    exitFullScreen(): void;
    supported(): boolean;
    shouldShowButton(): boolean;
    isFullScreen(): boolean;
    onFullScreenChange(cb: () => void): void;
}
declare class RewardKeysManager {
    init(): Promise<void>;
}
declare class PilgrimAchievementManager {
    #private;
    constructor(indexedDb: IndexedDB, mapsConfig: MapsConfig);
    reportVisitedMap(name: string): void;
}
export interface PeliEntitlements {
    has(entitlement: string): boolean;
    onChange(cb: () => void): void;
    removeOnChange(cb: () => void): void;
    ready: Promise<unknown>;
    getProof(): Promise<unknown>;
}
export interface PeliSubscription {
    showSubscribeModal(options: {
        flow: string;
    }): void;
    canShowSubscribeModal(options: {
        flow: string;
    }): boolean;
}
export interface PeliSession {
    isLoggedIn: boolean;
    login(): Promise<boolean>;
    logout(): Promise<boolean>;
    onLoggedInChange(cb: () => void): void;
    getAuthCode(options: {
        scope: string[];
        refreshable?: boolean;
        [key: string]: unknown;
    }): Promise<string>;
}
export interface PeliSdk {
    entitlements: PeliEntitlements;
    subscription: PeliSubscription;
    session: PeliSession;
}
export declare class Main {
    thirdPartyEnabled: boolean;
    peliSdkPromise: Promise<PeliSdk | null>;
    peliSdk: PeliSdk | null;
    gameWrapper: HTMLElement;
    scene: Scene;
    indexedDb: IndexedDB;
    settingsManager: SettingsManager;
    mainInfoTextManager: MainInfoTextManager;
    mainMenu: MainMenu;
    adBanners: AdBanners;
    dialogManager: DialogManager;
    fullScreenManager: FullScreenManager;
    input: InputManager;
    config: ConfigManager;
    mapLoader: MapLoader;
    preferredMapManager: PreferredMapManager;
    rewardKeysManager: RewardKeysManager;
    gameManager: GameManager;
    recentGameTracker: RecentGameTracker;
    cam: GameCamera;
    materials: GameMaterials;
    hudIcons: HudIcons;
    screenFlash: ScreenFlashManager;
    renderer: GameRenderer;
    assets: AssetsManager;
    skins: SkinsManager;
    skeletons: SkeletonsManager;
    avatars: AvatarsManager;
    classSelectionImageManager: ClassSelectionImageManager;
    sfx: SoundFX;
    network: NetworkManager;
    auth: AuthManager;
    playerAvatarManager: PlayerAvatarManager;
    profileState: ProfileState;
    shopState: ShopState;
    pilgrimAchievementManager: PilgrimAchievementManager;
    quantcastManager: QuantcastManager;
    poki: Poki;
    boundLoop: () => void;
    prevNow: number;
    now: number;
    dt: number;
    dt16: number;
    smoothDt: number;
    useFakeNow: boolean;
    fakeNow: number;
    fastLoopCount: number;
    frameCount: number;
    frameCap: number;
    maxDt: number;
    env: string;
    darkMedia: MediaQueryList;
    constructor();
    init(): void;
    getPeliSdk(): PeliSdk | null;
    getPeliSdkAsync(): Promise<PeliSdk | null>;
    getPeliSdkOrThrow(): PeliSdk;
    getPeliSdkOrThrowAsync(): Promise<PeliSdk>;
    updateTheme(): void;
    vsyncLoop(): void;
    loop(): void;
}
type TouchControlArea = TouchControl;
export {};
//# sourceMappingURL=game.d.ts.map