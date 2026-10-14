import { AssetWorkerMessenger, n as n_1 } from "./three";
import { Mesh, Object3D, Matrix4, Vector3, Quaternion, Scene, PlaneGeometry, Color, ShaderMaterial, Box3, Sphere, Vector2, PerspectiveCamera, Group, type Renderer, Texture } from "three";
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
declare class SettingsManager {
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
    addButtonsContainer({ vertical, parent }?: {
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
    createLinkedAccountEl({ email, issuer, unlinkButtonOptions }: {
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
    onWorkerMessageCbs: Map<_, Set<{
        cb: () => void;
        endOnly: boolean;
    }>>;
    onWorkerErrorCbs: Map<_, Set<() => void>>;
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
    onWorkerMessage(k: any, cb: () => void, endOnly?: boolean): void;
    onWorkerError(t: any, cb: () => void): void;
    static deserializeThreeObject(t: any): Object3D | null;
    static deserializeThreeObjectRecursive(t: any, e: any): Object3D;
    loadGlbViaWorker(t: any, { packageName, teamId, keepCustomProperties, merge, signal, }?: {
        keepCustomProperties?: never[] | undefined;
        merge?: boolean | undefined;
        packageName?: string | undefined;
        signal?: null | undefined;
        teamId?: number | undefined;
    }): Promise<Object3D | null>;
}
export interface SkinColorMultiplier extends Array<number> {
    0: number;
    1: number;
    2: number;
}
export interface SkinData {
    gender?: string;
    equippedSkinIds?: string[];
    unequippedSkinIds?: string[];
    hairColorMultiplier?: number[];
    eyebrowColorMultiplier?: number[];
    beardColorMultiplier?: number[];
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
    setPresetGender(presetId: number, gender: string): void;
    setPresetSkinItemColor(presetId: number, category: string, colorMultiplier: number[]): void;
    savePresets(): Promise<void>;
    getClassSkinData(classId: string, createIfMissing: boolean): SkinData;
    getClassSkinDataWithAppliedPreset(classId: string): SkinData;
    setClassPreset(classId: string, presetId: number | null): void;
    addShopItemToClass(itemId: string, classId: string): void;
    removeShopItemFromClass(itemId: string, classId: string): void;
    setClassGender(classId: string, gender: string): void;
    setClassSkinItemColor(classId: string, category: string, colorMultiplier: number[]): void;
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
            colorMultiplier: number[];
            joints: string[];
        }[];
    };
    skinNetworkDataToBowAssetData(t: any, e: any): {
        skins: unknown[];
        arrowSkin: string | undefined;
    };
    skinNetworkDataToMeleeSkinConfig(skinData: SkinData): MeleeSkinConfig | null;
    skinNetworkDataToArrowSkinConfig(t: any): string | undefined;
    getSkinFromShopItem(shopItem: ShopItemConfig, gender: string): ShopSkinSide | null;
    getConfigForPreviewShopItemId(t: any, { itemId, colorCategory, colorMultiplier }: {
        colorCategory: any;
        colorMultiplier: any;
        itemId: any;
    }): {
        gender: any;
        equippedSkinIds: unknown[];
        beardColorMultiplier: any;
        hairColorMultiplier: any;
        eyebrowColorMultiplier: any;
    };
    onSkinConfigChange(t: any): void;
    removeOnSkinConfigChange(t: any): void;
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
declare class ee {
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
    setActiveStructure(t: any): void;
    createAndPushPage(t: any): void;
    popPage(): void;
    updateButtonVisibilies(): void;
    jumpToSubPage(t: any): void;
    updatePageVisibilities(): void;
}
declare class se {
    skeletonPath: any;
    skeletonObject: null;
    onSkeletonLoadCbs: Set<unknown>;
    onObjectLinksBuilt: Set<unknown>;
    _currentGender: any;
    weight: number;
    currentlyLoadingPoseAbortController: null;
    objectLinksBuilt: boolean;
    objectLinks: never[];
    constructor(t: any, e: any);
    setGender(t: any): void;
    reloadPose(): Promise<void>;
    waitForLoad(): Promise<void>;
    buildObjectLinks(t: any): void;
    waitForObjectLinks(): Promise<void>;
    apply(): void;
}
type PlayerGender = "male" | "female";
declare class PlayerSkeleton {
    player: Player | null;
    isInit: boolean;
    onInitCbs: Set<() => void>;
    onAllLinkLayerObjectsBuiltCbs: Set<unknown>;
    _currentGender: PlayerGender;
    poseLayers: never[];
    skeletonMatrixObjects: never[];
    baseSkeletonObject: null;
    headObj: null;
    bodyObj: null;
    armLObj: null;
    armRObj: null;
    legObjectsL: null;
    legObjectsR: null;
    initCalled: boolean;
    constructor({ player, gender }?: {
        player?: Player | null;
        gender?: PlayerGender;
    });
    init(): Promise<void>;
    waitForLoad(): Promise<void>;
    assertInit(): void;
    createPoseLayer(t: any): se;
    addPoseLayer(t: any): se;
    removePoseLayer(t: any): void;
    get gender(): PlayerGender;
    setGender(t: any): void;
    linkLayerObjects(t: any): Promise<void>;
    get allObjectLinksBuilt(): boolean;
    waitForLinkLayerObjects(): Promise<void>;
    replacePoseLayer(t: any, e: any): se;
    insertPoseLayer(t: any, e: any): se;
    setLookRotY(t: any, e: any): void;
    applyLookRotation(t: any, e: any, i: any): void;
    applyLayers(): void;
    updateMatrices(): void;
    getMatrices(): any[];
}
declare class GameMaterials {
    materialsCache: Map<any, any>;
    extraMaterials: Set<unknown>;
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
    allMaterials(): Generator<any, void, unknown>;
    getMaterialByName(t: any): any;
    addCachedMaterial(t: any): void;
    addExtraMaterial(t: any): void;
    removeExtraMaterial(t: any): void;
    applyWeatherParams(t: any): void;
    static resetWeatherUniforms(t: any): void;
    setLightningValue(t: any): void;
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
declare class re {
    skinObjectOpts: any;
    isInit: boolean;
    destructed: boolean;
    obj: null;
    materials: never[];
    lastSetMatrices: null;
    onInitCbs: Set<unknown>;
    getSkinAbortController: AbortController;
    useWorldWeather: boolean;
    initCalled: boolean;
    constructor({ skinObjectOpts, init, useWorldWeather }: {
        init?: boolean | undefined;
        skinObjectOpts: any;
        useWorldWeather?: boolean | undefined;
    });
    destructor(): void;
    init(): Promise<void>;
    waitForInit(): Promise<void>;
    applySkeleton(t: any): void;
    setHitFlashMaterialsTime(t: any): void;
    setHitFlashMaterialsValue(t: any, e: any, i: any): void;
    computeApproximateBoundingSphere(): Sphere;
}
declare class he {
    obj: Object3D;
    label: string;
    useWorldWeather: boolean;
    currentlyLoadingAbortController: any;
    currentAssetName: string;
    currentMeleeAsset: any;
    onFirstAssetLoadCbs: Set<unknown>;
    onNewAssetLoadedCbs: Set<unknown>;
    currentlyLoadedMaterials: any[];
    constructor({ useWorldWeather, label }?: {
        label?: string | undefined;
        useWorldWeather?: boolean | undefined;
    });
    destructor(): void;
    setConfig(t: any): Promise<void>;
    destroyMaterials(): void;
    destroyBowMeshes(): void;
    waitForLoad(): Promise<void>;
    get isLoadingAsset(): boolean;
    onNewAssetLoaded(t: any): void;
}
declare class ce {
    obj: Object3D;
    useWorldWeather: boolean;
    lastFireAmount01: number;
    lastVisibleCount: number;
    currentBowAsset: any;
    onFirstAssetLoadCbs: Set<unknown>;
    onAssetChangeCbs: Set<unknown>;
    currentlyLoadingAbortController: any;
    currentlyLoadedMaterials: any[];
    currentArrowObjs: any[];
    currentArrowOffsets: any[];
    onArrowDestroyCallbacks: Set<unknown>;
    arrowAssetLoader: he;
    arrowObjectsConfig: {
        arrowCount: number;
        arrowPositions: string;
    };
    arrowPointIdle: Object3D;
    arrowPointLoaded: Object3D;
    constructor({ useWorldWeather }?: {
        useWorldWeather?: boolean | undefined;
    });
    destructor(): void;
    setConfig(t: any): Promise<void>;
    rebuildArrowObjects(): void;
    getClonedArrowObject(t: any): Object3D | null;
    destroyMaterials(): void;
    destroyBowMeshes(): void;
    waitForLoad(): Promise<void>;
    onAssetChange(t: any): void;
    get isLoadingAsset(): boolean;
    get assetLoaded(): boolean;
    getLoadedArrowPointScale(): Vector3;
    updateFireAmount(t: any, e: any): void;
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
export interface ShopItemRenderOptions {
    colorMultiplier: number[];
    gender: string;
}
export interface ShopItemOptions {
    configIndex?: number;
    usage?: string;
    renderOptions: ShopItemRenderOptions;
    dialog: Dialog;
    scrollingContainer?: HTMLElement;
}
declare class me {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    shopItems: Map<any, any>;
    activeConfirmPurchaseDialogs: Set<unknown>;
    currentHoveringItem: any;
    onHoveringItemChangeCbs: Set<unknown>;
    onSelectedItemChangeRequestCbs: Set<unknown>;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    addShopItem(t: any, e: any): void;
    closeCreatedConfirmPurchaseDialogs(): void;
    destructShopItems(): void;
    loadShopItems(t: any, e: any): void;
    setRenderOptions(t: any): void;
    setSelectedItems(t: any): void;
    setSelectedItemState(t: any, e: any): void;
    onSelectedItemChangeRequest(t: any): void;
    setPurchasedItems(t: any): void;
    onHoveringItemChange(t: any): void;
    sortShopItems(): void;
    performHighlightShopItemAction(t: any, e: any): void;
}
declare class we {
    destructed: boolean;
    el: HTMLDivElement;
    currentlyLoadedSkinData: SkinData | null;
    currentTeamId: number;
    tooltipCategory: string;
    statsTooltip: any;
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
    activeCamFollowingTarget: any;
    activeSlotPositionId: any;
    camPositions: Map<any, any>;
    boundOnMouseMove: (event: MouseEvent) => void;
    lastMouseX: number;
    lastMouseY: number;
    skeleton: PlayerSkeleton;
    activeExtraPoseLayer: any;
    bowAssetLoader: ce;
    hoveringBowAssetLoader: ce;
    bowSkeletonObj: any;
    currentVisibleBowId: string | null;
    currentEquippedSkinIds: string[];
    hoveringBowVisible: boolean;
    meleeAssetLoader: he;
    hoveringMeleeAssetLoader: he;
    meleeSkeletonObj: any;
    currentVisibleMeleeSkinAssetName: string | null;
    hoveringMeleeVisible: boolean;
    activeModel: any;
    loadingModel: any;
    hoveringModel: any;
    hoveringModelVisible: boolean;
    lastHoveringModelCacheKey: string;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    initSkeleton(): Promise<void>;
    addModel(t: any): Promise<void>;
    removeModel(t: any): void;
    loop(t: any, i: any): void;
    setHoveringModel(skinObjectOpts: any): void;
    setHoveringShopItemId(itemId: string): void;
    setTemporaryColorCategory(colorCategory: string, colorMultiplier: number[]): void;
    resetHoveringModel(): void;
    updateVisibleModelAfterHoveringInit(): Promise<void>;
    updateSkinModel(): void;
    setCurrentSkinConfig(skinData: SkinData): void;
    setTooltipCategory(tooltipCategory: string): void;
    updateBackgroundColor(): void;
    replaceLoadingModel(): Promise<void>;
    onMouseMove(event: MouseEvent): void;
    getVisibleModel(): any;
    updateVisibleModel(): void;
    updateVisibleBow(): void;
    updateVisibleMelee(): void;
    updateSkeletonGender(): Promise<void>;
    updateModelRotation(): void;
    setActiveSlotPosition(t: any, e?: boolean): void;
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
declare class be {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    dialog: Dialog;
    skinManager: SkinsManager;
    customizationId: CustomizationId;
    onBackButtonClickCbs: Set<() => void>;
    pagedView: ee;
    createdGrids: Map<HTMLElement, {
        grid: me;
        reloadFilteredItems: () => void;
        pagedViewStructure: unknown;
    }>;
    skinPreview: we;
    filterSubPages: Map<string, unknown>;
    showHiddenItems: boolean;
    constructor(gameWrapper: HTMLElement, skinManager: SkinsManager, { id, rootHeader, dialog }: CustomizationViewConfig);
    destructor(): void;
    onBackButtonClick(cb: () => void): void;
    closeCreatedDialogs(): void;
    loop(now: number, dt: number): void;
    updateShopState(purchasedItemIds: Set<unknown>): void;
    highlightOrOpenShopItem(categories: string[], itemId: string, action: string): void;
    resetSkinPreview({ camPosition }?: {
        camPosition?: string | undefined;
    }): void;
    createBowGridViewConfig(weapon: BowConfig, section: string): SkinPreviewOptions & {
        filterOptions: ShopFilterOptions;
    };
    setSkinPreview({ skinPreviewCamPosition, skeletonPose, bowId, meleeSkinAssetName, }: SkinPreviewOptions): void;
    createGridViewSubPage({ itemName, buttonIcon, hasPeliPlusIcon, buttonIconSize, filterOptions, skinPreviewCamPosition, skeletonPose, bowId, meleeSkinAssetName, colorButtonsCategory, previewTooltipCategory, }: GridViewSubPageOptions): PagedViewStructure;
    filterPurchasableItems(items: ShopItemConfig[], gender: string, filterOptions?: ShopFilterOptions): ShopItemConfig[];
    getShopItemRenderOptions(colorCategory: string): {
        colorMultiplier: number[];
        gender: string;
    };
    createShopItemsGrid(scrollingContainer: HTMLElement, { filterOptions, pagedViewStructure, colorButtonsCategory, }: {
        filterOptions?: ShopFilterOptions;
        pagedViewStructure: PagedViewStructure;
        colorButtonsCategory?: string;
    }): void;
    updateSelectedItemsForClass(classId: string, grid: me): void;
    getCurrentSkinData(): SkinData;
    updateSkinPreviewConfig(): void;
    destroyShopItemsGrid(scrollingContainer: HTMLElement): void;
}
declare class ye {
    el: HTMLDivElement;
    backgroundEl: HTMLDivElement;
    imageEl: HTMLDivElement;
    seed: number;
    classId: any;
    updateReference: eo;
    constructor(t: any, { extraClasses }?: {
        extraClasses?: never[] | undefined;
    });
    destructor(): void;
    set needsUpdates(t: any);
    setCssColor(t: any, e: any): void;
}
declare class Se {
    el: HTMLDivElement;
    onClickCbs: Set<unknown>;
    classSelectionImage: ye;
    constructor(t: any);
    set needsAvatarUpdates(t: any);
    destructor(): void;
    onClick(t: any): void;
}
declare class Ce {
    skinManager: any;
    onPresetOpenClickCbs: Set<unknown>;
    onBackButtonClickCbs: Set<unknown>;
    el: HTMLDivElement;
    presetsList: HTMLDivElement;
    createdPresetItems: any[];
    addPresetButton: CustomButton;
    constructor(t: any);
    destructor(): void;
    updatePresetList(): void;
    onPresetOpenClick(t: any): void;
    onBackButtonClick(t: any): void;
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
declare class ke extends Dialog {
    currentCustomizationView: be | null;
    currentPresetsView: Ce | null;
    mainViewVisible: boolean;
    ownedCoinsContainer: HTMLDivElement;
    currencyContainer: CurrencyContainer;
    classSelectionContainer: HTMLDivElement;
    presetsButton: CustomButton;
    classSelectionListEl: HTMLDivElement;
    createdClassSelectionItems: Se[];
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
    openShopItemSubPage(itemId: string, action: string): void;
    highlightShopItem(itemId: string, action: string): void;
    openShopItem(itemId: string): void;
}
declare class Pe extends Dialog {
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
declare class xe {
    el: HTMLButtonElement;
    clickCbs: Set<unknown>;
    avatarEl: HTMLDivElement;
    usernameEl: HTMLDivElement;
    ownedCoins: CurrencyContainer;
    boundAvatarUrlChanged: (t: any) => void;
    constructor();
    init(): void;
    setUsername(t: any): void;
    onClick(t: any): void;
    setMainMenuVisibility(t: any): void;
    avatarUrlChanged(t: any): void;
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
declare class Me {
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
declare class Ae {
    el: HTMLInputElement;
    constructor({ value, placeholder, extraClasses, onInput, spellCheck, maxLength, }?: TextInputOptions);
    get value(): string;
    set value(newValue: string);
}
declare class Le extends Dialog {
    squadManager: any;
    settings: Map<any, any>;
    privateSquadOnlySettings: Set<unknown>;
    privateSquadSetting: Setting<SettingValue, {
        text: string;
        type: "toggle";
    }>;
    leaderOnlyMessage: HTMLDivElement;
    constructor(t: any, e: any);
    destructor(): void;
    onSquadSettingChange: (t: any, e: any) => void;
    onMySquadLeaderStateChange: () => void;
    updateLeaderMessageVisibility(): void;
    updateDisabledState(): void;
}
declare class Te {
    cb: any;
    id: number;
    ms: any;
    isDestructed: boolean;
    constructor(t: any, e: any, i?: boolean);
    destructor(): void;
    get isRunning(): boolean;
    stop(): boolean | undefined;
    start(t?: any): void;
    execute(): void;
    static promise(t: any): Promise<unknown>;
}
declare class Ee {
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
    loop(e: any, i: any): void;
    performValueLoop(t: any): number;
}
declare class De {
    xValue: Ee;
    yValue: Ee;
    zValue: Ee;
    constructor({ startValue, springMultiplier, maxSpring, dampening, }?: {
        dampening?: number | undefined;
        maxSpring?: number | undefined;
        springMultiplier?: number | undefined;
        startValue?: Vector3 | undefined;
    });
    loop(t: any, e: any): void;
    get value(): Vector3;
    set value(t: Vector3);
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
declare class Fe {
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
    camPosOffsetPhysics: De;
    camRotOffsetPhysics: Ee;
    renderOverlay: RenderOverlay;
    firstPersonObjContainer: Object3D;
    linkedThirdPersonObject: Object3D | null;
    firstPersonConfig: FirstPersonConfig;
    constructor(player: Player, { holdingObject, thirdPersonParentName, secondaryThirdPersonParentName, firstPersonConfig }: HoldingHandlerOptions);
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
    collider: unknown;
}
declare class Collider {
    rigidBody: RigidBody;
    radius: number;
    heightOffset: number;
    bodyPart: string;
    arrowDamage: number;
    constructor(rigidBody: RigidBody, radius: number, heightOffset: number, bodyPart: string, arrowDamage: number);
    get center(): Vector3;
    rayCast(from: Vector3, dir: Vector3): RayCastHit | null;
}
declare class Ve {
    invWorldMatrix: any;
    invWorldMatrixNoTranslate: any;
    worldMatrix: any;
    aabb: null;
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
    constructor(t: any, { ignoreArrows, isLadder, isLadderAllSides, excludeTeamId, excludeWearingShopItems, isDeathTrigger, shootSfx, allowJump, allowWalk, movePlayerUp, slippery, slowDownPlayerAmount, airFrictionModifier, touchDamageAmount, touchDamageDistance, triggerHingeId, triggerAppearingObjectId, }: {
        airFrictionModifier?: number | undefined;
        allowJump?: boolean | undefined;
        allowWalk?: boolean | undefined;
        excludeTeamId?: number | undefined;
        excludeWearingShopItems?: never[] | undefined;
        ignoreArrows?: boolean | undefined;
        isDeathTrigger?: boolean | undefined;
        isLadder?: boolean | undefined;
        isLadderAllSides?: boolean | undefined;
        movePlayerUp?: boolean | undefined;
        shootSfx?: string | undefined;
        slippery?: boolean | undefined;
        slowDownPlayerAmount?: number | undefined;
        touchDamageAmount?: number | undefined;
        touchDamageDistance?: number | undefined;
        triggerAppearingObjectId?: number | undefined;
        triggerHingeId?: number | undefined;
    });
    rayCast(from: Vector3, dir: Vector3): RayCastHit | null;
    getSphereManifold(t: any, e: any): void;
    isTriggerCollider(): boolean;
}
declare class je extends Ve {
    box: Box3;
    aabb: Box3;
    cachedUpFaces: any;
    constructor(...t: any[]);
    getSphereManifold(t: any, e: any): {
        colliderType: string;
        pos: Vector3;
        isAtEdge: boolean;
        isAtUpFace: boolean;
        isAtSecondUpFace: boolean;
        normal: any;
        penetration: number;
    };
    getUpFaces(): any;
    getIsOnFace(t: any, e: any): boolean;
    rayCast(from: Vector3, dir: Vector3): RayCastHit | null;
}
declare class Ge {
    enabled: boolean;
    constructor();
    beginPhysicsSteps(): void;
    stepVelocity(t: any): void;
    resolveMapCollisionsOctree(t: any): void;
    endPhysicsSteps(): void;
}
declare class RigidBody extends Ge {
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
    climbingLadder: any;
    climbingLadderNormal: any;
    isTouchingDamageCollider: boolean;
    lastTouchDamageColliderPosition: any;
    lastTouchDamageColliderTime: number;
    wasOnFloorLastFrame: boolean;
    isOnSlipperyCollider: boolean;
    slowDownColliderAmount: number;
    airFrictionModifier: number;
    fly: boolean;
    noclip: boolean;
    constructor(physicsManager: PhysicsManager, player: Player);
    beginPhysicsSteps(): void;
    stepVelocity(t: any): void;
    updateLastFloorTouchTime(): void;
    endPhysicsSteps(): void;
    get inAirTime(): number;
    get prevInAirTime(): number;
    get onFloorTime(): number;
    get onJumpableColliderTime(): number;
    getCurrentPlayerAabb(): Box3;
    getIntersectingOctreeNodes(): Set<OctreeNode>;
    getPlayerManifolds(t: any, e: any): ({
        manifold: any;
        mapCollider: Collider;
        playerCollider: any;
    } | {
        manifold: {
            colliderType: string;
            pos: any;
            normal: any;
            penetration: any;
        };
        mapCollider: null;
        playerCollider: any;
    })[];
    getManifoldsHelper(t: any, e: any, i: any, s: any): ({
        manifold: any;
        mapCollider: Collider;
        playerCollider: any;
    } | {
        manifold: {
            colliderType: string;
            pos: any;
            normal: any;
            penetration: any;
        };
        mapCollider: null;
        playerCollider: any;
    })[];
    isAboveJumpableCollider(): boolean;
    manifoldShouldMovePlayerUp(t: any, e: any): any;
    resolveMapCollisionsOctree(t: any): void;
    needsLadderPhysics(t: any, e: any): any;
    applyForce(t: any): void;
    getAllowJump(): boolean;
    jump(t: any): void;
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
declare class oi {
    holdingHandler: Fe;
    upConfig: Partial<FirstPersonConfig>;
    downConfig: Partial<FirstPersonConfig>;
    offscreenConfig: Partial<FirstPersonConfig>;
    minDownVelocity: number;
    forcedConfig: Partial<FirstPersonConfig> | null;
    prevUsePrimaryPosition: boolean;
    usePrimaryPosition: boolean;
    holdingHandlerDown: boolean;
    constructor(holdingHandler: Fe, { upConfig, downConfig, offscreenConfig, minDownVelocity }: WeaponHolderOptions["holdingHandlerManagerOptions"]);
    setUsePrimaryPosition(usePrimary: boolean): void;
    loop(isUp: boolean, player: Player, { forceDown, forceConfig }?: {
        forceDown?: boolean;
        forceConfig?: Partial<FirstPersonConfig> | null;
    }): void;
    updateHoldingHandler(applyImmediately?: boolean): void;
}
export interface WeaponActionOptions {
    fromTouchButton: boolean;
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
declare class ai {
    player: Player;
    actionIsDown: boolean;
    rawActionIsDown: boolean;
    firstPersonVisible: boolean;
    isPrimaryWeapon: boolean;
    equipSfxName: string;
    holdingHandler: Fe;
    holdingHandlerManager: oi;
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
    getThirdPersonSkeletonMultipliers(_gender: string): Record<string, number>;
}
declare class ri extends ai {
    bowWeaponId: any;
    bowWeaponTypeId: any;
    equipSfxName: string;
    bowAssetLoader: ce;
    constructor(t: any, e: any, i: any, s: any);
    destructor(): void;
    getAutoShootEnabled(): SettingValue | undefined;
    actionDown(t: any): void;
    actionUp(t: any): void;
    shootArrow(t: any): void;
    verifyArrowFrequency(t: any): boolean;
    getArrowOpts(t: any): void;
    loop(t: any, e: any): void;
    getAutoShootActionUp(): boolean;
    getAccuracyOffset(): number;
    getWalkAccuracyMultiplier(): number;
    getClonedArrowObject(t: any): Object3D | null;
    getLoadSpeed(t: any, i: any): number;
}
declare class di extends ai {
    #private;
    get lastSkinAssetName(): null;
    equipSfxName: string;
    hitSfxName: string;
    swingSfxName: string;
    hitSfxOptions: any;
    meleeAssetLoader: he;
    constructor(t: any, e: any);
    destructor(): void;
    getRequiredHorizontalAngleMultiplier(): number;
    getRequiredVerticalAngleMultiplier(): number;
    attack(): boolean;
    playHitSfx(): void;
    validateHit(t: any): boolean;
    ownedPlayerAttacked(t: any): void;
    getDamageMultiplier(): number;
    getStunData(): {
        amount: number;
        duration: number;
        fadeDuration: number;
    };
    getRangeMultiplier(): number;
    getAttackSpeedStat(): number;
    updateMeleeAsset(skinAssetName: any): void;
}
declare class mi {
    keyNumber: any;
    el: HTMLDivElement;
    classSelectionImage: ye;
    _selected: boolean;
    keyEl: HTMLDivElement;
    onClickCbs: Set<unknown>;
    constructor({ classId, keyNumber }: {
        classId: any;
        keyNumber: any;
    });
    get selected(): boolean;
    set selected(t: boolean);
    set needsAvatarUpdates(t: any);
    onClick(t: any): void;
    setCssColor(t: any, e: any): void;
}
declare class WeaponSelectionDialog extends Dialog {
    playerVisibility: boolean;
    selectionItemsContainer: HTMLDivElement;
    weaponSelectionItems: mi[];
    boundPrevPress: () => boolean;
    boundNextPress: () => boolean;
    prevKey: any;
    nextKey: any;
    boundKeyDown: (t: any) => void;
    boundUpdateSelectedUi: () => void;
    boundUpdateVisible: () => void;
    constructor(t: any);
    destructor(): void;
    updateSelectedUi(): void;
    updateNeedsAvatarUpdates(): void;
    setCssColor(t: any, e: any): void;
    onKeyDown(t: any): void;
    selectWeapon(t: any): boolean;
    deltaSelectWeapon(t: any): boolean;
    setPlayerVisibility(t: any): void;
    setMainMenuVisibility(t: any): void;
    updateVisible(): void;
}
export interface PlayerParams {
    teamId: number;
    needsPlayerModel: boolean;
    needsSkeleton: boolean;
    isDummyPlayer: boolean;
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
    recentStunEvents: Set<unknown>;
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
    rigidBody: RigidBody;
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
    movementAccuracyOffset: Bi | null;
    holdingFlag: Flag | null;
    sentChangeFlagMessages: {
        flagId: number;
        changeOperation: number;
        sendTime: number;
    }[];
    statClassValues: Map<string, number> | null;
    holdingHandlers: Set<Fe>;
    needsPlayerModel: boolean;
    loadingModel: re | null;
    activeModel: re | null;
    skeleton: PlayerSkeleton | null;
    mostRecentWeaponSkeletonLayers: {
        name: string;
        weight: number;
    }[];
    weaponActionIsDown: boolean;
    bowWeapon: ri | null;
    meleeWeapon: di | null;
    meleeWeaponId: string | null;
    hasActiveMeleeWeapon: boolean;
    lastActiveWeaponToggleTime: number;
    didUpdateActiveWeaponAfterToggle: boolean;
    recentlyDestroyedWeapons: Map<number, number>;
    lastSentArrowId: number;
    weaponAccuracyOffset: Bi | null;
    gungameWeaponIndex: number;
    allowedWeaponsConfig: {
        allowMelee: boolean;
        availableBowIds: number[];
    };
    lastWeaponLayersKey: string;
    weaponLayers: se[];
    recentInvalidArrowTimes: number[];
    recentArrowCreationTimes: number[];
    dead: boolean;
    currentSpawnId: number;
    dieTime: number;
    deadAnimationWeight: number;
    deadFallForward: boolean;
    deadFromFall: boolean;
    sphereDeathTimer: number;
    sphereDeathScreenFlash: ScreenFlash | null;
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
    equippingWeaponLayer: se | null;
    deadForwardLayer: se | null;
    deadBackwardLayer: se | null;
    constructor(game: OnlineGame | OfflineGame, inputManager: InputManager, sfxManager: SoundFX, physicsManager: PhysicsManager, settingsManager: SettingsManager, hudIconsManager: HudIcons, id: number, { teamId, needsPlayerModel, needsSkeleton, isDummyPlayer }?: Partial<PlayerParams>);
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
    get activeWeapon(): di | ri | null;
    getEquippedWeapons(): Generator<di | ri, void, unknown>;
    getSelectedWeapon(): number;
    updateMySelectedWeapon(t?: boolean): void;
    sendMyEquippedSkinData(): void;
    getSendArrowId(): number;
    getClonedArrowObject(onDestroy: () => void): Object3D | null;
    loop(nowMs: number, deltaMs: number): void;
    get legsMoveTForCos(): number;
    afterPhysicsLoop(t: any, i: any): void;
    animateLeg(t: any, i: any, s: any, n: any, o: any): void;
    createHoldingHandler(t: any): Fe;
    removeHoldingHandler(t: any): void;
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
    sendPerformAction(t: any): void;
    receivedPerformAction(t: any): void;
    receiveChangeClassFromServer(t: any): void;
    setHasOwnership(hasOwnership: boolean): void;
    setPlayerName(playerName: string): void;
    setNamePlayerVerified(): void;
    setTeamId(teamId: number): void;
    setIsSameSquadPlayer(isSameSquad: boolean, squadPlayerId: number, isLeader: boolean): void;
    setScores({ scores, elo }: {
        scores: {
            flags: number;
            kills: number;
            deaths: number;
            total: number;
        };
        elo: number;
    }): void;
    setHasEvents(t: any): void;
    setHasSmoothCam(value: SettingValue): void;
    updateSmoothCam(): void;
    resetSmoothLookRot(): void;
    setHasMovementAccuracyOffset(t: any): void;
    getStatClassValue(statName: string): number;
    reloadPlayerModel(): void;
    updateSkinStats(): void;
    setPlayerEquippedSkinData(skinData: SkinData): void;
    replaceLoadingModel(): Promise<void>;
    setWeaponSelectionDialogVisibility(t: any): void;
    updateModelVisibility(): void;
    updateUseFirstPersonHoldingHandlers(): void;
    onJumpPress(): void;
    jump(): void;
    onFireDown(options?: WeaponActionOptions | null): void;
    onFireUp(options?: WeaponActionOptions | null): void;
    startToggleActiveWeaponCooldown(): void;
    updateAllowedWeaponsConfig(): void;
    setGungameWeaponIndex(t: any): void;
    toggleActiveWeapon(): void;
    receiveChangeWeaponTypeFromServer(t: any): void;
    updateActiveWeapon(): void;
    setServerFlyEnabled(t: any): void;
    updateFly(): void;
    onWheel(e: any): void;
    onThirdPersonChange(): void;
    addHitFlash(t: any): void;
    addMeleeHitFlash(): void;
    playerClaimedHitByArrow(t: any, e: any, i: any): void;
    markValidArrowHit(t: any, e: any, i: any): void;
    serverArrowCreated(): void;
    get avgArrowCreationFrequency(): number;
    getMeleeDamage(t: any): number;
    hitByMeleeFromServer(t: any): void;
    addOwnedPlayerForkDamage(t: any): void;
    hitByArrowFromServer(t: any): void;
    verifiedKillByServer(t: any): void;
    applyStun(stun: any): void;
    getDamageAmountForCurrentArmor(t: any): {
        damageWithoutArmorStrength: number;
        damageWithArmorStrength: number;
    };
    applyDamage(t: any, e: any, i: any): boolean;
    computeDamageWithCooldown(t: any): number;
    forceSetHealthFromServer(t: any): void;
    setHealthFromHit(t: any, arrowHitNormalWorld: any, i: any, s: any): void;
    getCamPos(): Vector3;
    getCamRot(): Quaternion;
    getFrontThirdPersonCamRot(): Quaternion;
    computeCamRot(t: any): Quaternion;
    getCamXRotQuaternion(): Quaternion;
    getFlatWalkDirection(): Vector3;
    getShootDirection(): Vector3;
    setServerData(t: any, e: any, i: any, s: any, n: any, o?: boolean): void;
    setPingData(t: any): void;
    getDeltaPositionMsAgo(e: any): Vector3;
    updateIconOwnershipVisibility(myTeamId?: number): void;
    updateIconVisibility(): void;
    getSmallAvatar(): Avatar;
    touchedDamageCollider(t: any): void;
    dieFromFall(): void;
    die(t?: boolean): void;
    respawn(t: any): void;
    receivedSpawn(t: any, e: any): void;
    resetDeadPoseWeights(): void;
    onPlayerHasInteractedChange(t: any): void;
    setPlayerHasInteracted(): void;
    getLookDirection(): Vector3;
    computeDeadFallDirection(): boolean;
    updateHealthUi(t: any): void;
    setPosition(t: any): void;
    sendChangeFlag(flagId: any, changeOperation: any, i?: boolean): void;
    changeFlagFromServer(t: any, e: any): void;
    stopHoldingFlag(t: any): void;
    removeChangeFlagFromQueue(t: any, e: any): undefined;
    updateEliminationScoreboard(): void;
    report(t: any, e: any): void;
}
declare class Ti extends Ge {
    physicsManager: any;
    flag: any;
    pos: Vector3;
    velocity: Vector3;
    isOnFloor: boolean;
    radius: number;
    aabb: Box3;
    constructor(t: any, e: any);
    stepVelocity(t: any): void;
    resolveMapCollisionsOctree(t: any): void;
    getColliderAabb(): Box3;
    getManifolds(): {
        manifold: any;
        mapCollider: any;
    }[];
}
declare class Flag {
    #private;
    id: any;
    teamId: any;
    defaultPosition: any;
    defaultRotation: any;
    position: any;
    game: any;
    physicsManager: any;
    isOnDefaultPos: boolean;
    rigidBody: Ti;
    obj: Object3D;
    grabAnimationContainer: Object3D;
    grabStartTime: number;
    returnProgress: number;
    onNearDefaultPosChangeCbs: Set<unknown>;
    isNearDefaultPos: boolean;
    onCurrentHoldingPlayerChangeCbs: Set<unknown>;
    currentHoldingPlayer: any;
    prevIsBeingHeld: boolean;
    holdingHandler: any;
    icon: HudIcon;
    destructed: boolean;
    constructor(t: any, e: any, i: any, s: any, n: any, o: any);
    destructor(): void;
    initModel(): Promise<void>;
    updateRenderState(): void;
    updateRenderPosition(): void;
    loop(t: any, e: any): void;
    afterPhysicsLoop(t: any, e: any): void;
    startHoldByPlayer(t: any): void;
    destroyHoldingHandler(): void;
    returnToDefaultPos(): void;
    returnToDefaultPosFromFall(): void;
    get heldCountSinceLastReturn(): number;
    removeCurrentHoldingPlayer(): void;
    onCurrentHoldingPlayerChange(t: any): void;
    setDroppedPosition(t: any, e: any, i: any, s: any, n: any, o: any): void;
    onNearDefaultPosChange(t: any): void;
    updateIsNearDefaultPos(): void;
    sendFlagReturnProgressToServer(t: any): void;
    addReturnProgress(t: any): void;
    droppedByOwner(): void;
}
declare class ArrowManager {
    physics: any;
    hingeManager: any;
    teamCount: any;
    arrows: Map<any, any>;
    oldPlayerArrows: Set<unknown>;
    sphereGeos: never[];
    destructed: boolean;
    constructor(t: any, e: any, i: any);
    destructor(): void;
    getSphereGeo(t: any): undefined;
    loop(t: any, e: any): void;
    createArrow(t: any, e: any): void;
    getArrowById(t: any, e: any): any;
    receivedHitValidationData(t: any): void;
}
declare class Bi {
    crosshair: Crosshair;
    _offset: number;
    constructor(crosshair: Crosshair);
    get offset(): number;
    set offset(value: number);
}
declare class Crosshair {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    lines: any[];
    flagReturnProgressSvg: SVGSVGElement;
    flagReturnProgressPath1: SVGPathElement;
    flagReturnProgressPath2: SVGPathElement;
    accuracyOffsets: Set<unknown>;
    currentAccuracy: number;
    smoothAccuracy: number;
    gameUiVisibility: boolean;
    thirdPersonVisibility: boolean;
    deadVisibility: boolean;
    mainInfoTextVisibility: boolean;
    boundUpdateThirdPersonVisibility: () => void;
    flagReturnAccuracyOffset: Bi;
    boundRebuildLines: () => void;
    boundSetLineColors: () => void;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    rebuildLines(): void;
    setLineColors(): void;
    loop(t: any, i: any): void;
    createAccuracyOffset(): Bi;
    deleteAccuracyOffset(t: any): void;
    updateAccuracyOffset(): void;
    setFlagReturnProgress(e: any): void;
    setFlagReturnProgressVisibility(t: any): void;
    setGameUiVisibility(t: any): void;
    setDeadVisibility(t: any): void;
    setMainInfoTextVisibility(t: any): void;
    updateThirdPersonVisibility(): void;
    updateVisibility(): void;
}
declare class qi {
    el: SVGSVGElement;
    returnTimerRectId: any;
    removePointPolygonId: any;
    points: Vector2[];
    lastBorderTimerPercent: number;
    returnTimerRect: any;
    removePointPolygon: any;
    removeAnimationTimeout: Te;
    constructor(t: any);
    getReturnTimerRect(): any;
    getRemovePointPolygon(): any;
    setState(t: any, e: any): void;
    setRemoved(t: any, e: any): void;
    setBorderTimerPercent(t: any): void;
}
declare class Hi {
    el: HTMLDivElement;
    iconEl: SVGSVGElement;
    teamId: any;
    onNeedsNotificationCbs: Set<unknown>;
    hasReceivedScore: boolean;
    currentMaxScoreCount: number;
    score: number;
    grabbedState: string;
    removeScoreTimerIsRunning: boolean;
    removeScoreTimer: number;
    prevNow: number;
    timerStateReceived: boolean;
    dots: qi[];
    constructor(t: any);
    setScore(t: any): void;
    setScoreTimerState(t: any): void;
    getBorderTimerPercent(): number;
    loop(t: any, e: any): void;
    setGrabbedState(t: any): void;
    updatePointIcons(): void;
    getFinalFlagHeld(): boolean;
    get hasFullScore(): boolean;
    getScoreWithGrabbedState(): number;
    onNeedsNotification(t: any): void;
    fireNeedsNotification(t: any): void;
}
declare class Wi {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    onNeedsNotificationCbs: Set<unknown>;
    scoreItems: Hi[];
    constructor(gameWrapper: HTMLElement, e: any);
    destructor(): void;
    update(t: any): void;
    setFlagScoreTimerState(t: any): void;
    loop(t: any, e: any): void;
    setFlagGrabbedState(t: any, e: any): void;
    getFinalFlagHeld(): boolean;
    getWinningTeam(): any;
    getFlagsRatio(): number;
    onNeedsNotification(t: any): void;
    setVisible(t: any): void;
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
    setHealth(t: any): void;
    flashDamageProtection(t: any): void;
    setVisible(t: any): void;
    setCssColor(t: any, e: any): void;
}
declare class SkipText {
    el: HTMLDivElement;
    text: string;
    currentTimerValue: number;
    currentInterval: null;
    onTimerEndCbs: Set<unknown>;
    onSkipActionCbs: Set<unknown>;
    creationCooldownEnd: number;
    allowSpaceSkip: boolean;
    keyDownCb: (e: KeyboardEvent) => void;
    constructor();
    destructor(): void;
    setText(t: any): void;
    setVisibility(t: any): void;
    updateText(): void;
    startTimer(t?: number): void;
    stopTimer(): void;
    startCreationCooldown(): void;
    setAllowSpaceSkip(t: any): void;
    waitForTimerEnd(): Promise<void>;
    waitForSkipAction(): Promise<void>;
    fireSkipAction(): void;
    waitForSkip(): Promise<void>;
}
declare class PlayersListDialog extends Dialog {
    playersList: any;
    skinManager: any;
    teamWonTitle: HTMLHeadingElement;
    teamsContainer: HTMLDivElement;
    currentAvatarBlobUrlReferences: Set<unknown>;
    configuredColumnTypes: any[];
    teamEls: {
        containerEl: HTMLDivElement;
        tbody: HTMLTableSectionElement;
        name: string;
        colGroupEl: HTMLTableColElement;
        headerRowEl: HTMLTableRowElement;
    }[];
    skipText: SkipText;
    scoresFrozen: boolean;
    playersListDirty: boolean;
    boundOnResize: () => void;
    constructor(t: any, e: any, i: any, customOnCurtainClickCb: any);
    destructor(): void;
    onVisibilityChange(): void;
    onResize(): void;
    playersListChanged(): void;
    updateTeamsOrder(t?: number): void;
    setActiveGamemode(t: any): void;
    updateTableHeaders(): void;
    updatePlayersList(): void;
    freezeScores(): void;
    setGameEndState(t: any): void;
}
declare class NotificationsUi {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    currentIconEl: any;
    constructor(gameWrapper: HTMLElement, e?: string);
    destructor(): void;
    showIcon(t: any): void;
    removeIcon(): void;
}
declare class ScoreOffsetNotificationsUi {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    listEl: HTMLDivElement;
    createdNotifications: any[];
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    showOffsetNotification(t: any, e: any): void;
    destroyOldNotifications(): void;
    updateNotificationOffsets(): void;
    removeAll(): void;
}
declare class GameOverStatsDialog extends Dialog {
    statsContainer: HTMLDivElement;
    didWatchRewardedAd: boolean;
    rewardedAdFailed: boolean;
    onRewardedAdIsPlayingChangeCbs: Set<unknown>;
    skipText: SkipText;
    boundOnResize: () => void;
    constructor(t: any, { trackedMyPlayerScores, totalScore, myTeamId, receivedCoins, coinsAlreadyDoubled, autoSkipStatsScreen, }: {
        autoSkipStatsScreen: any;
        coinsAlreadyDoubled: any;
        myTeamId: any;
        receivedCoins: any;
        totalScore: any;
        trackedMyPlayerScores: any;
    });
    onResize(): void;
    onRewardedAdIsPlayingChange(t: any): void;
    fireRewardedAdIsPlayingChange(t: any): void;
}
declare class ts {
    timeSeconds: number;
    name: string;
    running: boolean;
    startTime: number;
    onSuddenChangeCbs: Set<unknown>;
    constructor(t?: number, e?: string);
    setTotalTime(t: any): void;
    start(): void;
    clear(): void;
    onSuddenChange(t: any): void;
    get timeRemaining(): number;
    toString(): string;
}
interface CornerStatData {
    name: string;
    redThreshold: number;
}
declare class CornerStat {
    cornerStatsUi: CornerStatsUi;
    redThreshold: number;
    el: HTMLDivElement;
    valueEl: HTMLSpanElement;
    constructor(cornerStatsUi: CornerStatsUi, { name, redThreshold }: CornerStatData);
    setValue(t: any): void;
}
declare class CornerStatsUi {
    game: Game;
    container: HTMLDivElement;
    createdStats: any[];
    fpsStat: CornerStat;
    pingStat: CornerStat;
    networkStabilityStat: CornerStat;
    visible: boolean;
    _onVisiblityChangeCbs: (() => void)[];
    constructor(t: any, game: Game);
    destructor(): void;
    createCornerStat(data: CornerStatData): CornerStat;
    updateVisibility(): void;
    onVisibilityChange(t: () => void): void;
}
declare class Chat {
    gameWrapper: HTMLElement;
    game: OnlineGame;
    game: any;
    createdMessages: never[];
    visible: boolean;
    toggledVisible: boolean;
    el: HTMLDivElement;
    chatLogEl: HTMLDivElement;
    formEl: HTMLFormElement;
    textBoxEl: HTMLInputElement;
    chatKey: any;
    boundChatKeyCb: () => void;
    chatVisibilityKey: any;
    boundChatVisibilityKeyCb: () => void;
    boundUpdateVisibilities: () => void;
    boundOnTouchSupported: () => void;
    constructor(gameWrapper: HTMLElement, game: OnlineGame);
    destructor(): void;
    loop(): void;
    destroyMessage(t: any): void;
    sendMessage(): void;
    receivedChatMessage(messageThing: any): void;
    updateVisibility(): void;
    updateTouchButtonVisibility(): void;
    updateHeight(): void;
}
declare class os extends Ve {
    radius: any;
    pos: Vector3;
    aabb: Box3;
    constructor(...t: any[]);
    getSphereManifold(t: any, e: any): {
        colliderType: string;
        pos: any;
        normal: any;
        penetration: any;
    };
    rayCast(from: Vector3, dir: Vector3): RayCastHit | null;
}
declare class OctreeNode {
    aabb: Box3;
    depth: number;
    items: Collider[];
    allChildren: OctreeNode[];
    children: Set<OctreeNode>;
    constructor(aabb: Box3, depth?: number);
    addItems(items: any): void;
    subdivideRecursive({ boundsContainsCb, maxDepth, itemCountDivideLimit }: {
        boundsContainsCb: any;
        itemCountDivideLimit: any;
        maxDepth: any;
    }): void;
    subdivide(): void;
    traverseDown(t?: () => boolean): any;
    findEndNodes(t?: () => boolean): Generator<any, void, unknown>;
}
declare class PhysicsManager {
    rigidBodies: Set<unknown>;
    mapColliders: Collider[];
    rootOctreeNode: OctreeNode | null;
    octreeMaxDepth: number;
    mapBounds: null;
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
    loop(t: any, e: any): void;
    startLoweringTimeScale(): void;
    resetTimeScale(): void;
    registerRigidBody(t: any): any;
    removeRigidBody(t: any): void;
    addMapCollider(t: any): je | os;
    removeMapColliders(): void;
    buildOctree(): void;
    getOctreeNodesInAabb(box: Box3, e?: boolean): Set<OctreeNode>;
    getCollidersFromOctreeNodes(octreeNodes: any): Set<Collider>;
    getCollidersForAabbUsingOctree(box: Box3): Set<Collider>;
    worldToOctreeVoxelSpace(vec: Vector3): number[];
    octreeVoxelSpaceToNodePath([e, i, s]: [any, any, any]): number[] | null;
    getOctreeNodeForPath(t: number[]): OctreeNode | null;
    getColliders(): Generator<Collider, void, unknown>;
    getPlayerColliders(): Generator<Collider, void, unknown>;
    getRayCastCache(t: any, e: any): {
        from: any;
        to: any;
        dir: any;
        length: any;
        octreeNodes: Set<OctreeNode>;
    } | null;
    rayCastMapColliders(t: any, e?: null): RayCastHit | null;
    rayCastPlayerColliders(t: any, e?: null): RayCastHit | null;
    rayCastHelper(t: any, colliders: Collider[], i?: null): RayCastHit | null;
}
type GlobalVariables = {
    probability?: number;
};
declare class ls {
    lastReceivedGlobalVariables: GlobalVariables;
    lastReceivedRandomVariablesArray: GlobalVariables[];
    currentVariablesIndex: number;
    variablesIndexSeed: number;
    defaultValues: {
        floorDeathHeight: number;
        sphereDeathRadius: number;
        flyRoofHeight: number;
        flySphereCenter: number[];
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
        skyHighColor: number[];
        skyMidColor: number[];
        skyLowColor: number[];
        skyPower: number;
        fogAmount: number;
        fogHeightAmount: number;
        fogHeightOffset: number;
        fogHeightDistFalloff: number;
        fogHeightAmountMin: number;
        fogHeightAmountMax: number;
        colorMultiplier: number[];
        colorMultiplierAdjust: number;
        colorAdder: number[];
        colorAdderAdjust: number;
        saturation: number;
        lightningEnabled: boolean;
    };
    onVariablesChangedCbs: Set<() => void>;
    currentVariables: {
        floorDeathHeight: number;
        sphereDeathRadius: number;
        flyRoofHeight: number;
        flySphereCenter: number[];
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
        skyHighColor: number[];
        skyMidColor: number[];
        skyLowColor: number[];
        skyPower: number;
        fogAmount: number;
        fogHeightAmount: number;
        fogHeightOffset: number;
        fogHeightDistFalloff: number;
        fogHeightAmountMin: number;
        fogHeightAmountMax: number;
        colorMultiplier: number[];
        colorMultiplierAdjust: number;
        colorAdder: number[];
        colorAdderAdjust: number;
        saturation: number;
        lightningEnabled: boolean;
    };
    constructor();
    init(): void;
    setVariables(receivedGlobalVariables: GlobalVariables | undefined, lastReceivedRandomVariablesArray: GlobalVariables[]): void;
    updateVariablesIndex(): void;
    setSeed(seed: number): void;
    updateVariablesFromArray(): void;
    onVariablesChanged(t: any): void;
    get(t: any): any;
}
declare class MapLoader {
    configManager: any;
    mapsConfig: any;
    onIsLoadingMapChangeCbs: Set<unknown>;
    isLoadingMap: boolean;
    loadCloudsCalled: boolean;
    environmentIsInit: boolean;
    cachedMapHashes: Set<unknown>;
    fetchingMapCbs: Map<any, any>;
    onOneMapAvailableCbs: Set<unknown>;
    firstMapDownloaded: boolean;
    onFirstMapDownloadedCbs: Set<unknown>;
    onMapCachedCbs: Set<unknown>;
    mapVariablesManager: ls;
    cloudsObj: any;
    currentLoadingMapContexts: Map<any, any>;
    lastMapLoadRequestId: number;
    constructor(t: any, e: any);
    init(): Promise<void>;
    cacheRemainingMaps(): Promise<void>;
    openCache(): Promise<Cache | null>;
    markMapAsCached(t: any, e?: boolean): void;
    hasCachedMap(t: any): boolean;
    deleteLegacyCaches(): Promise<void>;
    deleteOldMapCaches(): Promise<void>;
    waitForOneMapAvailable(): Promise<void>;
    fireFirstMapAvailable(): void;
    waitForFirstMapDownload(): Promise<void>;
    onMapCached(t: any): void;
    fireOnMapCachedCbs(): void;
    reloadMap(): void;
    loadDevMap(t: any): Promise<void>;
    loadLoadingMap(t: any): Promise<void>;
    loadConfigMap(t: any, e: any, i: any, { retryOnFail }?: {
        retryOnFail?: boolean | undefined;
    }): Promise<void>;
    loadConfigMapWithDialogMessage(t: any, e: any, i: any): Promise<boolean>;
    loadMap(t: any, cb: any): Promise<void>;
    reloadMapsConfigAndRetryLoadConfigMap(t: any, e: any, i: any): Promise<void>;
    reportFirstMapDownloaded(): void;
    reportMapLoadProgress(t: any, e: any): void;
    setGamplayObjects(t: any, e: any): void;
    loadMapResponseCbReceived(t: any, e: any): void;
    initEnvironment(): void;
    updateWeatherParams(): void;
    updateCloudHeight(): void;
    static disposeMapGeometries(t: any): void;
    loadClouds(): Promise<void>;
}
declare class PreferredMapManager {
    mapLoader: any;
    mapsConfigLoader: any;
    votedScores: Map<any, any>;
    _forcingSoloMap: null;
    onMatchMakeDataChangeCbs: Set<unknown>;
    constructor(t: any, e: any);
    onMatchMakeDataChange(t: any): void;
    getMatchMakePreferredMapHashes(): {
        hash: any;
        preference: number;
    }[] | null;
    getMatchMakeData(): {
        op: string;
        mapHashes: {
            hash: any;
            preference: number;
        }[];
        configTimestamp: any;
        allowPreferredOnly: boolean;
    } | null;
    getRandomPreferredMapHash(): any;
    getOrCreateMapVoteData(t: any): any;
    voteMap(t: any): void;
    markRecentMap(t: any): void;
    forceSoloMap(t: any): void;
    disableForcedSoloMap(): void;
    get isForcingSoloMap(): boolean;
    get forcingSoloMap(): null;
}
declare class cs {
    appearingObjects: never[];
    destructed: boolean;
    constructor();
    destructor(): void;
    removeObjects(): void;
    setAppearingObjects(t: any): void;
    updatePlayerPositions(t: any): void;
    loop(t: any, e: any): void;
}
declare class HingeManager {
    hingeObjects: never[];
    activeHingeObjects: Map<any, any>;
    onHingeMoveCbs: Map<any, any>;
    destructed: boolean;
    constructor();
    destructor(): void;
    setHingeObjects(t: any): void;
    shootHinge(t: any, e: any, i: any): null;
    onHingeMove(t: any, e: any): void;
    removeOnHingeMove(t: any, e: any): void;
    loop(t: any, e: any): void;
}
declare class GameTimerUi {
    gameWrapper: HTMLElement;
    gameWrapper: any;
    visible: boolean;
    el: HTMLDivElement;
    tenMinutesEl: HTMLSpanElement;
    oneMinuteEl: HTMLSpanElement;
    tenSecondsEl: HTMLSpanElement;
    oneSecondEl: HTMLSpanElement;
    timeRemainingData: any;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    addDigitEl(): HTMLSpanElement;
    setTimeRemaining(remaining: any): void;
    loop(t: any, e: any): void;
    setVisible(t: any): void;
    updateVisibility(): void;
}
declare class gs {
    el: HTMLDivElement;
    teamId: any;
    teamColor: string;
    playerDots: any[];
    alivePlayers: number;
    constructor(t: any);
    setPlayerCount(t: any, e: any): void;
    get hasAlivePlayer(): boolean;
}
declare class EliminationScoreUi {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    scoreTeams: gs[];
    constructor(gameWrapper: HTMLElement, e: any);
    destructor(): void;
    setPlayerCount(t: any, e: any, i: any): void;
    getWinningTeam(): any;
    setVisible(t: any): void;
}
declare class fs {
    gameWrapper: HTMLElement;
    el: HTMLDivElement;
    gamemodeEl: HTMLSpanElement;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    setActiveGamemode(t: any): void;
    setVisible(t: any): void;
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
    setProgress(t: any, e: any, i: any): void;
    getWinningTeam(): 1 | 2 | null;
    setVisible(t: any): void;
    updateVisibility(): void;
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
    appearingObjectsManager: cs;
    gameIsVisible: boolean;
    receivedColliders: boolean;
    scene: Object3D | null;
    onGameIsVisibleCbs: Set<unknown>;
    onUsedForCamShotsOnlyChangeCbs: Set<unknown>;
    _usedForCameraShotsOnly: boolean;
    uiVisible: boolean;
    activeGamemodeUi: fs | null;
    flagScoreUi: Wi | null;
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
    gameEndWaitTimers: ts[];
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
    gameEndStatsShowTimer: ts | null;
    gameEndAdBreakTimer: ts | null;
    gameEndRewardedAdTimer: ts | null;
    gameEndStatsAfterRewardedAdTimer: ts | null;
    currentLoadedMapHash: string | null;
    boundUpdateUiVisible: () => void;
    boundOnPlayerListDown: () => void;
    boundOnPlayerListUp: () => void;
    antiCheat: AntiCheat;
    chat: Chat;
    constructor(gameWrapper: HTMLElement);
    destructor(): void;
    get sdkGameplayStarted(): boolean;
    onSdkGameplayStartedChange(t: any): void;
    fireSdkGameplayStartedChange(): void;
    setActiveGamemode(t: any): void;
    createKingOfTheHillSphereIfNeeded(): void;
    updateKingOfTheHillRenderPosition(): void;
    setGameTimerTimeRemaining(t: any): void;
    loadMap(t: any): Promise<void>;
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
        colors: (typeof n_1)[number];
        myTeamId: number;
    };
    updateMyTeamColor(): void;
    setPlayerName(t: any, e: any): void;
    setPlayerNameVerified(t: any): void;
    setPlayerTeamId(t: any, e: any): void;
    setPlayerServerFlyEnabled(t: any, e: any): void;
    setSameSquadPlayerData(t: any): void;
    onSquadPlayersChange(t: any): void;
    fireSquadPlayersChange(): void;
    setPlayerScores(t: any): void;
    createFlag(t: any, e: any, i: any): void;
    getMyFlags(t?: number): Generator<Flag, void, unknown>;
    getEnemyFlags(t?: number): Generator<Flag, void, unknown>;
    playerChangeFlag(t: any, e: any, i: any): void;
    showFlagNotification(t: any): void;
    setFlagDroppedPosition(t: any, e: any, i: any, s: any, n: any, o: any, a: any): void;
    loop(e: any, s: any): void;
    getMyPlayer(): Player | null;
    getMyTeamId(): number;
    updatePlayerIconVisibilities(): void;
    updateWaitingForPlayersText(): void;
    setPlayerServerData(t: any, e: any, i: any, s: any, n: any, o: any, a?: boolean): void;
    playerServerDataFrameEnded(): void;
    setPlayerPingData(t: any, e: any): void;
    createServerArrow(t: any, e: any, i: any, s: any, n: any, o: any, a: any, r: any, l: any): void;
    getSpawnPosition(team: number, key: number): {
        pos: Vector3;
        rot: Quaternion;
    };
    playerClaimedHitByArrow(t: any, e: any, i: any, s: any): void;
    playerHitByMelee(t: any, e: any): void;
    playerHitByArrow(t: any, e: any): void;
    verifiedKillByServer(t: any, e: any): void;
    forceSetPlayerHealthFromServer(t: any, e: any): void;
    receivedPlayerPerformAction(t: any, e: any): void;
    receivedPlayerSpawn(t: any, e: any, i: any): void;
    receivePlayerChangeClass(t: any, e: any): void;
    receivePlayerChangeWeaponType(t: any, e: any): void;
    setPlayerEquippedSkinData(t: any, e: any): void;
    setPlayerGungameWeaponIndex(t: any, e: any): void;
    updateFlagScoreboard(t: any): void;
    updateAllEliminationScoreboards(): void;
    updateEliminationScoreboard(teamId: number): void;
    updateFlagGrabbedStates(): void;
    updateFinalFlagMusic(): Promise<void>;
    showKillNotification(): void;
    showKilledNotification(): void;
    offsetPlayerScore(t: any, e: any, i: any): void;
    ownedPlayerDied(): void;
    notifyGameStarted(): void;
    receivedGameEndAccountStats(t: any): void;
    updateGameEndShowStatsScreen(): void;
    notifyGameEnded(): void;
    doGameEndSteps(): Promise<void>;
    canEstimateGameEndWaitTime(): boolean;
    estimateMaxGameEndWaitTimeSeconds(): number;
    createGameEndWaitTimer(t?: number, e?: string): ts;
    onEstimatedMaxGameEndWaitTimeSuddenChange(t: any): void;
    fireEstimatedMaxGameEndWaitTimeSuddenChange(): void;
    onMyPlayerChange(t: any): void;
    onGameEnd(t: any): void;
    onGameEndFinish(t: any): void;
    onGameEndStatsScreen(t: any): void;
    closeGameOverStatsDialog(): void;
    finishGameEndFlow(): void;
    onPlayerListDown(): void;
    onPlayerListUp(): void;
    get usedForCameraShotsOnly(): boolean;
    updateUsedForCameraShotsOnly(): void;
    becameForegroundGame(): void;
    updateSceneVisibility(): void;
    updateGameIsVisible(): void;
    onGameIsVisible(t: any): void;
    onUsedForCamShotsOnlyChange(t: any): void;
    updateUiVisible(): void;
    setUiVisible(t: any): void;
    reportOwnedPlayerHeadshotKill(t: any): void;
    reportOwnedPlayerHeadshotMiss(): void;
}
declare class Ss extends Dialog {
    networkManager: NetworkManager;
    squadManager: SquadManager;
    gameManager: GameManager;
    avatarsManager: AvatarsManager;
    skinManager: SkinsManager;
    currentSquadId: string | null;
    squadIdText: HTMLDivElement;
    copyUrlButton: CustomButton;
    clipboardPermissionGranted: boolean;
    joinSquadIdInput: Ae;
    joinSquadIdButton: CustomButton;
    membersTbody: HTMLTableSectionElement;
    inSquadButtonsContainer: HTMLDivElement;
    boundOnReadyToJoinChange: (ready: boolean) => void;
    startButton: CustomButton;
    squadSettingsDialog: Le | null;
    currentAvatarBlobUrlReferences: Set<BlobURLReference>;
    boundUpdateSquadId: () => void;
    boundOnSquadIdChange: () => void;
    boundOnSquadMembersChange: () => void;
    boundOnLeaderStateChange: () => void;
    boundOnSquadSettingChange: (setting: string, value: unknown) => void;
    boundUpdateStartButtonEnabled: () => void;
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
    updateStartButtonEnabled(t?: boolean): void;
    updateReadyStartButtonVisibility(): void;
}
declare class vs {
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
declare class Cs extends Dialog {
    #private;
    configManager: ConfigManager;
    preferredMapManager: PreferredMapManager;
    gameManager: GameManager;
    mapsContainer: HTMLDivElement;
    maps: vs[];
    constructor(gameWrapper: HTMLElement, configManager: ConfigManager, preferredMapManager: PreferredMapManager, gameManager: GameManager);
    destructor(): void;
    updateMaps(mapsConfig: MapsConfigData): void;
    highlightItem(assetName: string): void;
}
declare class MainMenu {
    gameWrapper: HTMLElement;
    el: HTMLElement | null;
    loadingImageContainer: HTMLElement;
    currentJoinState: string;
    loadScreenHidden: boolean;
    toggledVisibilityState: boolean;
    toggleMenuButton: CustomButton;
    visible: boolean;
    onVisibilityChangeCbs: Set<unknown>;
    contentVisible: boolean;
    userProfileDialog: Pe | null;
    cornerProfile: xe;
    menuButtonsContainer: HTMLDivElement;
    loginButton: MainMenuButton;
    settingsDialog: SettingsDialog | null;
    settingsButton: MainMenuButton;
    shopDialog: ke | null;
    shopButton: MainMenuButton;
    squadDialog: Ss | null;
    squadButton: MainMenuButton;
    mapsDialog: Cs | null;
    mapsButton: MainMenuButton;
    fullScreenButton: MainMenuButton;
    exitFullScreenButton: MainMenuButton;
    installButton: MainMenuButton;
    installAvailable: boolean;
    installPromptAccepted: boolean;
    updateButton: MainMenuButton;
    exitButton: MainMenuButton;
    promoBanner: Me | null;
    currentMusicSfx: SFXSound | null;
    hideUi: boolean;
    constructor(gameWrapper: HTMLElement);
    init(): void;
    loop(now: number, dt: number): void;
    updateLoadingImageVisibility(): void;
    setJoinState(t: any): void;
    updateSquadButtonsText(): void;
    onGameStartGesture(): void;
    updateFullScreenButtonVisibility(): void;
    updateInstallButtonVisibility(): void;
    updateExitGameVisibility(): void;
    makeMainMenuVisibleFromUserGesture(): void;
    makeContentVisible(): void;
    updateVisibility(): void;
    updateToggleMenuVisible(): void;
    onVisibilityChange(t: any): void;
    removeOnVisibilityChange(t: any): void;
    get shouldPlayMusic(): boolean;
    updatePlayingMusic(): Promise<void>;
    openShopDialog(): ke;
    openUserProfileDialog(t: any): void;
    openSquadDialog(): void;
    openMapsDialog(): Cs;
}
declare class AdBanners {
    gameWrapper: HTMLElement;
    visiblePages: Set<unknown>;
    desktopBanner: null;
    mobileBanner: null;
    hasRemoveAdsEntitlement: boolean;
    constructor(gameWrapper: HTMLElement);
    init(): Promise<void>;
    getBanners(): Generator<never, void, unknown>;
    setPageVisibility(t: any, e: any): void;
    updateVisibilities(): void;
}
declare class Ws extends Dialog {
    indexPriority: number;
    closeOnButtonClick: boolean;
    titleEl: HTMLHeadingElement;
    textEl: HTMLDivElement;
    createdButtons: any[];
    constructor(t: any, { title, text, buttons, closeOnButtonClick, extraArgs, }?: {
        buttons?: {
            text: string;
            testLabel: string;
            onClick: undefined;
        }[] | undefined;
        closeOnButtonClick?: boolean | undefined;
        text?: string | undefined;
        title?: string | undefined;
    });
    setButtons(t: any): void;
    setButtonsEnabled(t: any): void;
    waitForButton(): Promise<unknown>;
}
declare class DialogManager {
    gameWrapper: HTMLElement;
    gameWrapper: HTMLElement;
    curtainEl: HTMLDivElement;
    _curtainElVisible: boolean;
    onCurtainVisibilityChangeCbs: Set<unknown>;
    onNeedsUnlockedPointerChangeCbs: Set<unknown>;
    needsUnlockedPointer: boolean;
    lastDialogAddTime: number;
    currentDialogStack: any[];
    onCurtainZIndexChangeCbs: Set<unknown>;
    onAnyDialogVisibilityChangeCbs: Set<unknown>;
    constructor(gameWrapper: HTMLElement);
    addDialog(t: any): void;
    getDialogForEl(t: any): any;
    get frontDialog(): any;
    get firstClosableDialog(): any;
    get hasAnyDialogs(): boolean;
    get curtainElVisible(): boolean;
    closeTopMostDialog(): void;
    showAlert(t: any): Ws;
    onAnyDialogVisibilityChange(t: any): void;
    fireAnyDialogVisibilityChangeCbs(): void;
    sortStack(): void;
    updateZIndices(): void;
    updateInertDialogs(): void;
    setCurtainZIndex(t: any): void;
    onCurtainZIndexChange(t: any): void;
    onCurtainVisibilityChange(t: any): void;
    removeOnCurtainVisibilityChange(t: any): void;
    onNeedsUnlockedPointerChange(t: any): void;
    removeOnNeedsUnlockedPointerChange(t: any): void;
    updateFrontDialogProperties(): void;
}
declare class Xs {
    touchListener: HTMLDivElement;
    uiContainer: HTMLDivElement;
    joyStick: any;
    lookInput: any;
    jumpButton: any;
    fireButton: any;
    toggleWeaponButton: any;
    chatButton: any;
    playerListButton: any;
    thirdPersonButton: any;
    touchElements: any[];
    smallCornerButtons: any[];
    lastDeltaLook: Vector2;
    lastUpdateTouchesTime: number;
    touchSupported: boolean;
    onTouchSupportedChangeCbs: Set<unknown>;
    onTouchListenerClickCbs: Set<unknown>;
    constructor(t: any);
    init(): void;
    updateUiVisibility(): void;
    get joyStickValue(): any;
    onResize(): void;
    onTouchSupportedChange(t: any): void;
    removeOnTouchSupportedChange(t: any): void;
    visibileTouchElements(): Generator<any, void, unknown>;
    updateTouches(e: any): void;
    loop(t: any, e: any): void;
    afterLoop(): void;
    onTouchListenerClick(t: any): void;
    updateCursorVisibility(): void;
}
declare class InputManager {
    keys: Map<any, any>;
    desiredPointerLockedState: boolean;
    forceUnlockedPointer: boolean;
    currentLockedKeys: string;
    mouseIsOnDocument: boolean;
    lastWheelEventTime: number;
    wheelMoveAmount: number;
    lastFiredWheelButtonTime: number;
    recentWheelButtonCount: number;
    onPointerLockChangeCbs: Set<unknown>;
    onDesiredPointerLockChangeCbs: Set<unknown>;
    _lastPointerLockChangeByApplicationTime: number;
    stickDeadZone: number;
    gamepadLookSensivity: number;
    touch: Xs;
    mouseMove: Vector2;
    walkInput: Vector2;
    lookInput: Vector2;
    gamepadAxes: any[];
    constructor(t: any);
    init(): void;
    loop(t: any, e: any): void;
    updateGamepadStates(t: any, e: any): void;
    get pointerLocked(): boolean;
    inputHasFocus(): boolean | null;
    setKeyCodePressed(t: any, e: any): void;
    setMouseButtonPressed(t: any, e: any): void;
    fireWheelButton(t: any): void;
    setPressedGamepadButtons(t: any): void;
    unpressAll(): void;
    updateAxisInputs(): void;
    getKey(t: any): any;
    updateKeyboardLock(): Promise<void>;
    unlockPointer(): void;
    onPointerLockChange(t: any): void;
    onDesiredPointerLockChange(t: any): void;
    updateDesiredPointerLockedState(): void;
    _updatePointerLockedState(): void;
    _tryLockPointer(): Promise<void>;
}
export interface ListedMapConfig {
    name?: string;
    assetName?: string;
    hash?: string;
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
declare class rn {
    configManager: any;
    configPath: any;
    onConfigChangeCbs: Set<unknown>;
    loadedConfigData: unknown;
    constructor(t: any, e: any);
    transformData(t: any): void;
    load(): Promise<void>;
    onConfigChange(t: any, e?: boolean): void;
    removeOnConfigChange(t: any): void;
    waitForConfigLoad(): Promise<void>;
}
declare class MapsConfig extends rn {
    loadedConfigData: MapsConfigData | null;
    transformData(t: any): any;
    getListedMapConfigByHash(t: any): ListedMapConfig | null;
    hasListedMapConfigByHash(t: any): boolean;
    getListedMapConfigByAssetName(t: any): ListedMapConfig | null;
}
declare class PromosConfig extends rn {
    loadedConfigData: PromosConfigData | null;
    transformData(t: any): any;
}
declare class ShopsConfig extends rn {
    loadedConfigData: ShopConfigData | null;
    transformData(t: any): any;
    getPurchaseableItem(t: any): ShopItemConfig | null;
}
declare class ConfigManager {
    gameWrapper: HTMLElement;
    basePath: null;
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
    scene: null;
    gameIsVisible: boolean;
    onGameIsVisibleCbs: Set<unknown>;
    onSdkGameplayStartedChangeCbs: Set<unknown>;
    prevSdkGameplayStarted: boolean;
    myPlayer: Player;
    boundUpdateUiVisible: () => void;
    constructor(t: any);
    destructor(): void;
    loadMap(): void;
    setMapScene(t: any): void;
    get gameStarted(): boolean;
    get gameEnded(): boolean;
    get sdkGameplayStarted(): boolean;
    onSdkGameplayStartedChange(t: any): void;
    updateSdkGameplayStarted(): void;
    loop(t: any, e: any): void;
    onMyPlayerChange(t: any): void;
    getMyPlayer(): Player;
    getSpawnPosition(): SpawnPosition;
    getArrowAssetName(): string;
    updateGameIsVisible(): void;
    onGameIsVisible(t: any): void;
    updateUiVisible(): void;
    setUiVisible(t: any): void;
}
type Game = OfflineGame | OnlineGame;
export declare class GameManager {
    gameWrapper: HTMLElement;
    gameWrapper: HTMLElement;
    activeGame: Game | null;
    loadingBackgroundGame: null;
    joinedOnce: boolean;
    isInGamesLoop: boolean;
    onIsInGamesLoopChangeCbs: Set<unknown>;
    onActiveGameChangeCbs: Set<(game: Game | null) => void>;
    readyToJoin: boolean;
    onReadyToJoinChangeCbs: Set<unknown>;
    onGameEndCbs: Set<unknown>;
    windSfx: null;
    waterSfx: null;
    birdsSfx: null;
    jungleSfx: null;
    rainSfx: null;
    insectsSfx: null;
    constructor(gameWrapper: HTMLElement);
    init(): Promise<void>;
    loadWindSfx(): Promise<void>;
    loadWaterSfx(): Promise<void>;
    loadBirdsSfx(): Promise<void>;
    loadJungleSfx(): Promise<void>;
    loadRainSfx(): Promise<void>;
    loadInsectsSfx(): Promise<void>;
    setAmbientVolumes(t: any, e: any, i: any, s: any, n: any, o: any): void;
    onActiveGameChange(cb: (game: Game | null) => void): void;
    removeOnCurrentGameChange(cb: (game: Game | null) => void): void;
    fireCurrentGameChangeCbs(): void;
    onIsInGamesLoopChange(t: any): void;
    setIsInGamesLoop(t: any): void;
    loop(t: any, e: any): void;
    prepareMatchMaking(t: any): Promise<void>;
    loadOfflineRoamingGame(): void;
    joinedGameId(t: any): void;
    onGameEnd(t: any): void;
    setJoinedOnce(): void;
    getOnlineGame(): OnlineGame | null;
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
        colors: {
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
        } | undefined;
        myTeamId: number;
    };
    updateSdkGameplayStarted(): void;
    onReadyToJoinChange(t: any): void;
    removeOnReadyToJoinChange(t: any): void;
    setReadyToJoin(t: any): void;
}
declare class RecentGameTracker {
    indexedDb: IndexedDB;
    isLoadingStats: boolean;
    recentGameData: null;
    loadStatsPromise: Promise<void>;
    ignoreCurrentRecentGameData: boolean;
    constructor(indexedDb: IndexedDB);
    loadStats(): Promise<void>;
    getReconnectData(): Promise<{
        socketAddress: any;
        reconnectToken: any;
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
    lobbyCamPositions: any;
    hasDoneFirstLobbyShot: boolean;
    currentLobbyShot: any;
    currentLobbyShotT: number;
    currentLobbyShotDuration: number;
    thirdPersonMode: string;
    onThirdPersonChangeCbs: Set<unknown>;
    thirdPersonPhysicsNeedsReset: boolean;
    thirdPersonPhysics: De;
    thirdPersonOffsetPhysics: De;
    constructor(gameWrapper: HTMLElement);
    init(): void;
    onResize(): void;
    loop(t: any, i: any): void;
    computeLobbyShotDuration(): 10000 | undefined;
    playerRespawned(): void;
    get fov(): number;
    get fovOffset(): number;
    get rot(): Quaternion;
    get pos(): Vector3;
    get thirdPerson(): boolean;
    setLobbyCamPositions(t: any): void;
    getRayCastCache(t: any, e: any): {
        from: any;
        to: any;
        dir: any;
        length: any;
        octreeNodes: Set<OctreeNode>;
    } | null;
    setThirdPersonMode(t: any): void;
    onThirdPersonChange(t: any): void;
    removeOnThirdPersonChange(t: any): void;
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
    updateIconSize(t: any, e: any): void;
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
    createIcon(icon: any): HudIcon;
    removeIcon(t: any): void;
    setGlobalVisibility(t: any): void;
}
declare class ScreenFlash {
    scene: Scene;
    scene: any;
    material: any;
    autoFade: any;
    obj: Mesh<PlaneGeometry, any>;
    creationTime: number;
    shouldBeDestroyed: boolean;
    constructor(scene: Scene, material: Material, i: any, s: any, n: any, o: any, a: any);
    destructor(): void;
    loop(t: any): void;
    set opacity(t: any);
    set baseOpacity(t: any);
}
declare class ScreenFlashManager {
    scene: Scene;
    camera: PerspectiveCamera;
    material: null;
    createdFlashes: Set<unknown>;
    constructor(scene: Scene, camera: PerspectiveCamera);
    setMaterial(material: any): void;
    flash({ arrowHitNormalWorld, vignetteAmount, color, autoFade, hasDirection, }?: {
        autoFade?: boolean | undefined;
        color?: Vector3 | undefined;
        hasDirection?: boolean | undefined;
        vignetteAmount?: number | undefined;
    }): ScreenFlash | undefined;
    getThetaFromArrowHitNormal(t: any): number;
    loop(t: any): void;
}
declare class RenderView {
    dirty: boolean;
    alwaysDirty: boolean;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    onNextFrameRenderCbs: Set<() => void>;
    scene: null;
    cam: null;
    constructor({ width, height }?: {
        height?: number | undefined;
        width?: number | undefined;
    });
    setSize(width: number, height: number): void;
    setRenderObjects(scene: Scene, cam: PerspectiveCamera, dirty?: boolean): void;
    markDirty(): void;
    get needsRender(): boolean;
    render(renderer: any, width: number, height: number): void;
    waitForFrameRender(): Promise<void>;
    /** takes a screenshot of the canvas and returns it as a blob */
    getBlob(): Promise<Blob>;
}
declare class RenderOverlay {
    scene: Scene;
    cam: PerspectiveCamera;
    minFov: number;
    maxFov: number;
    near: number;
    far: number;
    enabled: boolean;
    constructor({ minFov, maxFov, near, far }?: {
        far?: number | undefined;
        maxFov?: number | undefined;
        minFov?: number | undefined;
        near?: number | undefined;
    });
    updateProjectionMatrix(): void;
}
declare class GameRenderer {
    gameWrapper: HTMLElement;
    renderer: Renderer;
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
    setSize(t: any, e: any): void;
    createRenderView(...params: any[]): RenderView;
    removeRenderView(view: RenderView): void;
    createRenderOverlay(...params: any[]): RenderOverlay;
    removeRenderOverlay(t: any): void;
    queryScreenshot(): Promise<unknown>;
    loop(t: any, e: any): void;
    renderWorthyEventHappened(t?: number): void;
    updateMainCanvasRenderEnabled(): void;
    setMainCanvasRenderEnabled(t: any): void;
    get needsRenderFrame(): boolean;
    renderCameras(): void;
    waitForFrameRender(waitCount?: number): Promise<void>;
}
declare class SkeletonsManager {
    cachedPoses: Map<string, Object3D>;
    loadingPoseCbs: Map<string, Set<(value: Object3D) => void>>;
    constructor();
    getSkeleton(name: string, { clone, signal }?: {
        clone?: boolean | undefined;
        signal?: null | undefined;
    }): Promise<Object3D>;
}
declare class SFXSound {
    cachedSfx: any;
    opts: any;
    destructed: boolean;
    sourceNode: null;
    gainNode: null;
    frontGainNode: null;
    frontSplitterNode: null;
    backGainNode: null;
    backSplitterNode: null;
    channelMergerNode: null;
    finalNode: null;
    pannerNode: null;
    preventDestructOnNextStop: boolean;
    lastSetVolume: number;
    isLoopPlaying: null;
    muted: boolean;
    forceMuted: boolean;
    startTime: number;
    pitch: number;
    constructor(t: any, e?: {});
    destructor(): void;
    init(): Promise<boolean | undefined>;
    setVolume(t: any, e?: boolean): void;
    volumeSettingChanged(t: any): void;
    setMuted(t: any, e?: boolean): void;
    start(t?: boolean): Promise<void>;
    stop(destruct?: boolean): void;
    pause(_?: boolean): void;
    resume(muted?: boolean): void;
    getEstimatedTime(): number;
}
declare class SoundFX {
    supported: boolean;
    packageName: `sfx${string}`;
    cachedSfx: {
        [k: string]: Pn;
    };
    createdSfx: SFXSound[];
    settingsMuted: boolean;
    adsMuted: boolean;
    muted: boolean;
    constructor();
    static _audioFormat: string | null;
    static _audioFormatSet: boolean;
    static get audioFormat(): string;
    static get audioFormatCamelCase(): string | null;
    init(): void;
    downloadPackage(): Promise<void>;
    loop(t: any, e: any): void;
    onCtxStatechange(): void;
    addUserEventListeners(): void;
    removeUserEventListeners(): void;
    userEvent(): Promise<void>;
    playSound(t: any, e: any): Promise<SFXSound | null | undefined>;
    setMutedSettings(t: any): void;
    setMutedAds(t: any): void;
    updateMuted(): void;
    sfxDestructed(t: any): void;
}
declare class Waiter<const F extends (...a: Args) => Promise<R>, const Args extends unknown[], const R> {
    promiseFn: F;
    once: boolean;
    promiseFn: F;
    _queue: {
        resolve(): void;
        args: Args;
    };
    _isEmptyingQueue: boolean;
    hasRun: boolean;
    _onceReturnValue: R | undefined;
    _onFinishCbs: Set<() => void>;
    constructor(promiseFn: F, { once }?: {
        once?: boolean | undefined;
    });
    run(...args: Args): Promise<unknown>;
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
    initConnection(): Promise<unknown>;
    assertInitConnection(): Promise<void>;
    get connected(): boolean | null;
    attemptSingleWsConnection(): Promise<WebSocket | null>;
    closeMatchMakingConnection(): void;
    markNextCloseAsIntentional(): void;
    fireOnCloseCbs(): void;
    updateQueueState({ isReadyToJoin, maxWaitTimeMs }?: {
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
    sendSquadSettingChange(setting: string, value: unknown): void;
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
    includeUnjoinedMembersTimeout: Te;
    waitingForSquadLoadingText: InfoText | undefined;
    waitingForSquadStartLoadingText: InfoText | undefined;
    gameSquadPlayers: SquadPlayer[];
    mySquadPlayerId: number;
    matchMakeAllReady: boolean;
    serverReadyForStartState: boolean;
    onServerReadyForStartStateChangeCbs: Set<() => void>;
    onServerReadyForStartTrueCbs: Set<() => void>;
    clientStartClicked: boolean;
    clientStartClickedTimeout: Te;
    serverStartClicked: boolean;
    startClicked: boolean;
    onStartClickedChangeCbs: Set<() => void>;
    prevUserVisibleSquadId: string | null;
    onUserVisibleSquadIdChangeCbs: Set<() => string>;
    onIsJoiningSquadChangeCbs: Set<() => void>;
    onSquadMembersChangeCbs: Set<() => void>;
    currentSquadSettings: SquadSettings | null;
    beforeMatchmakeConnectSquadSettings: SquadSettings | null;
    myClientIsSquadLeader: boolean;
    lastSquadLeaderToken: string | null;
    onSquadSettingChangeCbs: Set<(setting: string, value: unknown) => void>;
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
        skinData: {
            equippedSkinIds: never[];
            hairColorMultiplier: number[];
            eyebrowColorMultiplier: number[];
            beardColorMultiplier: number[];
        };
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
    setSquadSetting(t: any, e: any): void;
    onSquadSettingChange(t: any): void;
    removeOnSquadSettingChange(t: any): void;
    setConfiguredTeamColor(t: any, e: any): void;
    onMySquadLeaderStateChange(t: any): void;
    removeOnMySquadLeaderStateChange(t: any): void;
    sendCurrentUsername(): void;
    sendMySkinIds(): void;
    setMyClientIsSquadLeader(t: any): void;
    setIsJoiningSquad(t: any): void;
    requestInitialSquadId(): Promise<void>;
    handleSquadJoinError(errorType: string, squadId?: string | null): void;
    joinExistingSquad(t: any, e?: boolean, i?: boolean): Promise<undefined>;
    setMatchmakeServerSquadId(t: any): void;
    setGameServerSquadId(t: any): void;
    addRecentSquadId(t: any): void;
    squadIdReceivedFromGameServer(t: any): void;
    onUserVisibleSquadIdChange(t: any): void;
    removeOnUserVisibleSquadIdChange(t: any): void;
    updateUserVisibleSquadId(): void;
    updateLoadingText(): void;
    updateStartClicked(): void;
    joinSquadFromCurrentHash(t?: boolean): void;
    startSquad(): void;
    onIsJoiningSquadChange(t: any): void;
    removeOnIsJoiningSquadChange(t: any): void;
    onSquadMembersChange(t: any): void;
    removeOnSquadMembersChange(t: any): void;
    onServerReadyForStartStateChange(t: any): void;
    removeOnServerReadyForStartStateChange(t: any): void;
    waitForServerReadyForStart(): Promise<void>;
    onStartClickedChange(t: any): void;
    removeOnStartClickedChange(t: any): void;
    updateSquadMembersData(): void;
}
declare class NetworkManager {
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
    timeoutDialog: Ws | null;
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
    send(t: any): true | undefined;
    sendStringMessage(t: any, e: any): void;
    sendJsonMessage(t: any, e: any): void;
    sendCurrentVersion(): void;
    sendMySkinData(t: any): void;
    sendJoinReconnectToken(t: any): void;
    sendJoinGameId(t: any, e?: null): void;
    sendPlayerData(t: any, e: any, { posX, posY, posZ, rotX, rotY }?: {
        posX?: number | undefined;
        posY?: number | undefined;
        posZ?: number | undefined;
        rotX?: number | undefined;
        rotY?: number | undefined;
    }): void;
    getWorldBounds(t: any): {
        minX: number;
        minY: number;
        minZ: number;
        maxX: number;
        maxY: number;
        maxZ: number;
    };
    getDefaultFlagNetworkPositions(t: any): Generator<number[], void, unknown>;
    getDefaultSpawnNetworkPositions(t: any): number[][][] | null;
    getKingOfTheHillNetworkPosition(t: any): number[];
    mapWorldPosToNetworkPos(t: any, e: any, i: any, s: any): number[];
    mapNetworkPosToWorldPos(t: any, e: any, i: any, s: any): number[];
    mapNetworkVelocityToWorldVelocity(t: any, e: any, i: any): number[];
    sendCreateArrow(t: any, e: any, { arrowId, pos, dir, fireAmount01 }: {
        arrowId: any;
        dir: any;
        fireAmount01: any;
        pos: any;
    }): {
        arrowId: any;
        pos: Vector3;
        dir: Vector3;
        fireAmount01: number;
        networkOffsetPos: Vector3;
    };
    sendChangeFlag(t: any, e: any, i: any): void;
    sendCurrentLoadedMapHash(t: any): void;
    sendWorldBounds(t: any): void;
    sendDefaultFlagPositions(t: any): void;
    sendDefaultSpawnPositions(t: any): void;
    sendKingOfTheHillPosition(t: any): void;
    sendReportCheater(playerId: number, reportType: number, value: number): void;
    sendHitByArrow(t: any, e: any, i: any, s: any, n: any): void;
    sendValidArrowHit(t: any, e: any, i: any): void;
    sendChatMessage(t: any): void;
    sendRequestMapHash(t: any): void;
    sendRequestNextGameState(): void;
    sendPlayerPerformAction(t: any, e: any): void;
    sendRequestRespawn(t: any): void;
    sendChangeSelectedClass(t: any, e: any): void;
    sendChangeActiveWeaponType(t: any, e: any): void;
    sendMeleeHitPlayer(t: any, e: any, i: any): void;
    sendFlagReturnProgress(t: any, e: any): void;
    sendCurrentSession(): Promise<void>;
    sendSession(t: any): void;
    sendSquadData(t: any, e: any, leaderToken: any): void;
    sendRequestSquadId(): void;
    sendSquadLeaderRequestGameExit(): void;
    sendSquadLeaderChangePlayerTeam(t: any, e: any): void;
    sendPlayerFlySetting(): void;
}
declare class AuthManager {
    gameWrapper: HTMLElement;
    oAuthProviderConfigs: Map<any, any>;
    prevSessionNonce: any;
    sessionNonce: any;
    currentSessionData: any;
    currentGuestSessionData: any;
    openOAuthWindows: Set<unknown>;
    onOAuthWindowCloseCbs: Set<unknown>;
    isHandlingAuthToken: boolean;
    onAuthTokenHandleFinishCbs: Set<unknown>;
    mostRecentAuthTokenHandleResult: any;
    onLoggedInAccountChangeCbs: Set<unknown>;
    onGuestSessionDataChangeCbs: Set<unknown>;
    lastPeliLoginCounter: number;
    guestAccountData: any;
    guestAccountDataSetOnce: boolean;
    loginErrorAlert: any;
    refreshSessionInstance: Waiter<() => Promise<void>, unknown[], unknown>;
    refreshSessionIfNeededInstance: Waiter<() => Promise<void>, unknown[], unknown>;
    syncGuestDataWithRestServiceInstance: Waiter<() => Promise<false | undefined>, unknown[], unknown>;
    currentPeliLoginMigrationFlow: any;
    peliLoginStateUpdatesDisabled: boolean;
    updatePeliSdkLoginStateInstance: Waiter<() => Promise<void>, unknown[], unknown>;
    isInit: boolean;
    onInitCbs: Set<unknown>;
    constructor(gameWrapper: HTMLElement);
    init(): Promise<void>;
    waitForInit(): Promise<void>;
    onLoggedInAccountChange(t: any): void;
    removeOnLoggedInAccountChange(t: any): void;
    fireLoggedInAccountChange(): void;
    onGuestSessionDataChange(t: any): void;
    showLoginDialog(t?: string): Promise<unknown>;
    showLoginDialogWithErrorHandling(): Promise<void>;
    getSessionNonce(): any;
    setPrevSessionNonce(t: any): Promise<void>;
    setPeliLoginStateUpdatesDisabled(t: any): void;
    updatePeliSdkLoginState(): void;
    createForcedPeliLogoutDialog({ title, text }: {
        text: any;
        title: any;
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
    handleLinkAccountResultNotifications(t: any): void;
    getOAuthUrl(t: any, signal: any): Promise<string | null>;
    oAuthLogin(t: any, e: any): Promise<any>;
    closeOpenOAuthWindows(): void;
    handleAuthToken(t: any, e: any, i?: boolean): Promise<void>;
    waitForAuthTokenHandleFinish(): Promise<any>;
    setAuthTokenBody(t: any, e: any): void;
    mergeGuestDataWithLoggedInAccount(): Promise<boolean>;
    fetchAuthSessionData(t: any, e: any, { fromRefreshAttempt, ignoreFailures }?: {
        fromRefreshAttempt?: boolean | undefined;
        ignoreFailures?: boolean | undefined;
    }): Promise<{
        success: boolean;
        error: null;
    } | {
        success: boolean;
        error: string;
    }>;
    handleSessionDataResponse(t: any): Promise<void>;
    handleUnlinkRequest(t: any, e: any, i: any): Promise<boolean>;
    unlinkPeliAccount(): Promise<boolean>;
    unlinkAccount(t: any): Promise<boolean>;
    get isLoggedIn(): boolean;
    loginIfNotLoggedIn(): Promise<boolean>;
    logoutAfterError(): Promise<boolean>;
    showLoginError(t: any): void;
    logout(): Promise<void>;
    peliLogout(): Promise<"already-logged-out" | "dismissed" | "logged-out" | "not-supported">;
    logoutEverywhere(): Promise<void>;
    clearCurrentSessionData(): Promise<void>;
    getGuestAccountData(): Promise<any>;
    setGuestAccountData(t: any, e?: boolean): Promise<void>;
    getSessionDataForGameServer(): Promise<{
        type: string;
        token: any;
        secureId: any;
        guestData?: undefined;
    } | {
        token?: undefined;
        secureId?: undefined;
        type: string;
        guestData: any;
    }>;
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
declare class _n {
    authManager: AuthManager;
    indexedDb: IndexedDB;
    onStateChangedCbs: Set<unknown>;
    cachedStateIndexDbKey: string;
    getStateUrl: string;
    fetchCurrentDataInstance: Waiter<() => Promise<any>, unknown[], unknown>;
    stateIsStale: boolean;
    constructor(authManager: AuthManager, indexedDb: IndexedDB);
    init(): void;
    clearCurrentData(): void;
    clearAndRefetch(): void;
    saveCachedState(t: any): Promise<void>;
    loadCachedState(): Promise<void>;
    saveCurrentCachedState(): Promise<void>;
    markStateAsStale(): void;
    onStateChanged(t: any): void;
    removeOnStateChanged(t: any): void;
    fireStateChanged(): void;
    fetchCurrentData(t?: boolean): Promise<void>;
    waitForCurrentDataFetch(): Promise<void>;
    fetchCurrentDataFn(): any;
    loadStateData(t: any): void;
    getCurrentState(): void;
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
declare class ProfileState extends _n {
    cachedStateIndexDbKey: string;
    getStateUrl: string;
    isGuest: boolean;
    stats: Record<string, number>;
    maxLinkedAccountsReached: boolean;
    protected: boolean;
    canUnlinkAllAccounts: boolean;
    canBeDeleted: boolean;
    dbId: null;
    usernameData: UsernameData | null;
    peliAccountEmail: null;
    isPeliSession: boolean;
    canUnlinkPeliAccount: boolean;
    linkedAccounts: LinkedAccount[];
    constructor(...t: any[]);
    getCurrentState(): {
        username: string | null;
        isGuest: boolean;
        stats: Record<string, number>;
        maxLinkedAccountsReached: boolean;
        protected: boolean;
        canUnlinkAllAccounts: boolean;
        canBeDeleted: boolean;
        linkedAccounts: LinkedAccount[];
        dbId: null;
        usernameData: UsernameData | null;
        peliAccountEmail: null;
        isPeliSession: boolean;
        canUnlinkPeliAccount: boolean;
    };
    loadStateData(t: any): void;
    clearCurrentDataImpl(): void;
    getUsername(): string;
    setUsername(t: any): Promise<boolean>;
    getElo(): number;
}
declare class ShopState extends _n {
    #private;
    cachedStateIndexDbKey: string;
    getStateUrl: string;
    ownedCoins: number;
    purchasedItems: Set<unknown>;
    purchasingItemTasks: Map<any, any>;
    constructor(...t: any[]);
    getCurrentState(): {
        ownedCoins: number;
        purchasedItems: unknown[];
    };
    loadStateData(t: any): void;
    clearCurrentDataImpl(): void;
    sendPurchaseItemRequest(t: any): Promise<any>;
    purchasePaidItem(t: any, e: any): Promise<boolean>;
    purchaseRewardedItem(t: any, e: any, i: any, placement: any): Promise<boolean>;
    purchaseItem(t: any, e: any, i: any, s: any): Promise<boolean>;
    getVisibleItemPrice(t: any): any;
    provideNewCoinCount(t: any): void;
    doubleLastGameCoins(): Promise<{
        success: boolean;
        error: string;
        newCoinCount: any;
    }>;
    requestCheatCoins(t: any): Promise<boolean>;
    isPurchasingItem(t: any): boolean;
    itemIsPurchased(t: any): boolean;
    waitForItemPurchase(t: any): Promise<void>;
}
declare class Poki {
    pokiInit: boolean;
    pokiErrored: boolean;
    pokiInitErrored: boolean;
    onPokiInitCbs: never[];
    _usePokiSdk: boolean;
    gameplayStarted: boolean;
    loadStartCalled: boolean;
    loadFinishCalled: boolean;
    isShowingCommercialBreak: boolean;
    isShowingRewardedBreak: boolean;
    onRewardedBreakFinishCbs: Set<unknown>;
    _prevIsShowingBreak: boolean;
    onIsShowingBreakChangeCbs: Set<unknown>;
    prevVisiblePokiBanners: Set<unknown>;
    isPokiBuild: boolean;
    constructor(t: any);
    get usePokiSdk(): boolean;
    get supported(): boolean;
    get isShowingBreak(): boolean;
    init(): Promise<void>;
    waitForInit(): Promise<void>;
    gameplayStart(): Promise<void>;
    gameplayStop(): Promise<void>;
    gameLoadingStart(): Promise<void>;
    gameLoadingProgress(percentageDone: any): Promise<void>;
    gameLoadingFinished(): Promise<void>;
    peliAdsDisabled(): boolean;
    rewardedBreak({ category, details, placement }: {
        category: any;
        details: any;
        placement: any;
    }): Promise<{
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
    onIsShowingBreakChange(t: any): void;
    updateBannerVisibility(): void;
    happyTime(t?: number): Promise<void>;
    get isHappyDay(): boolean;
    openExternalLink(t: any): void;
}
declare class QuantcastManager {
    init(idk: boolean): void;
}
declare class BlobURLReference {
    onDestructedCbs: Set<() => void>;
    onBlobUrlCreatedCbs: Set<(url: string) => void>;
    blobUrl: null;
    destructed: boolean;
    constructor();
    destructor(): void;
    onDestructed(t: any): void;
    blobUrlCreated(url: any): void;
    getBlobUrl(): Promise<unknown>;
}
declare class Avatar {
    avatarsManager: AvatarsManager;
    config: any;
    blobUrlReferences: Set<unknown>;
    onDestructedCbs: Set<unknown>;
    blobUrl: string | null;
    createAvatarInstance: Waiter<() => Promise<void>, unknown[], unknown>;
    destructed: boolean;
    constructor(avatarsManager: AvatarsManager, config: any);
    destructor(): void;
    getBlobUrlReference(): BlobURLReference;
    onDestructed(t: any): void;
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
    skeletonPoseLayers: string;
    bow: null;
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
        skeletonPoseLayers: string | string[];
        bow: null;
        skinObjectOpts: {
            teamId: number;
            skin: SkinOpts;
        };
    };
    generateAvatarBlob(config: PartAvatarConfig): Promise<{} | null>;
    configToCacheKey(config: any): string;
    getAvatar(config: any): Avatar;
}
declare class eo {
    classId: any;
    classSelectionImageManager: any;
    _needsUpdates: boolean;
    lastBlobUrl: null;
    blobUrlChangeCbs: Set<unknown>;
    onNeedsUpdatesChangeCbs: Set<unknown>;
    constructor(t: any, e: any);
    destructor(): void;
    get needsUpdates(): boolean;
    set needsUpdates(t: boolean);
    onNeedsUpdatesChange(t: any): void;
    onBlobUrlChange(t: any, e?: boolean): void;
    fireUrlChangeCbs(t: any): void;
}
declare class ClassSelectionImageManager {
    cachedBlobUrlDatas: Map<any, any>;
    teamId: number;
    constructor();
    init(): void;
    markAllAvatarsDirty(): void;
    loadClassBlobUrl(t: any): Promise<void>;
    createClassBlobUrl(t: any): BlobURLReference;
    setTeamId(t: any): void;
    getOrCreateBlobUrlData(t: any): any;
    createUpdateReference(t: any): eo;
    removeUpdateReference(t: any, e: any): void;
}
declare class InfoText {
    text: any;
    showPercentage: boolean;
    shouldBounce: boolean;
    showInMainMenu: boolean;
    priority: number;
    percentage: number;
    isLoading: boolean;
    onStateChangeCbs: Set<unknown>;
    constructor(t: any, { startLoading, showPercentage, shouldBounce, showInMainMenu, priority, }?: {
        priority?: number | undefined;
        shouldBounce?: boolean | undefined;
        showInMainMenu?: boolean | undefined;
        showPercentage?: boolean | undefined;
        startLoading?: boolean | undefined;
    });
    setIsLoading(t: any): void;
    onStateChange(t: any): void;
    fireStateChange(): void;
    setShowPercentage(t: any): void;
    setPercentage(t: any): void;
    getText(): any;
}
declare class MainInfoTextManager {
    infoTextEl: HTMLElement | null;
    loadingTexts: Set<unknown>;
    constructor();
    init(): void;
    requestInfoText(...params: any[]): InfoText;
    removeInfoText(t: any): void;
    updateText(): void;
}
declare class PlayerAvatarManager {
    gameLoaded: boolean;
    avatar: null;
    currentAvatarBlobreference: null;
    onAvatarUrlChangeCbs: Set<unknown>;
    currentBlobUrl: null;
    updateAvatarInstance: Waiter<() => Promise<void>, unknown[], unknown>;
    constructor();
    setGameLoaded(): void;
    updateAvatarVisibility(): void;
    setAvatar(avatar: any): void;
    onAvatarUrlChange(t: any): void;
    removeOnAvatarUrlChange(t: any): void;
}
declare class FullScreenManager {
    onFullScreenChangeCbs: Set<unknown>;
    onAutoFullScreenChangeCbs: Set<unknown>;
    constructor();
    init(): void;
    onAutoFullScreenChange(t: any): void;
    hasAutoFullScreen(): SettingValue | undefined;
    updateAutoFullScreen(): void;
    suggestAutoFullScreen(): Promise<void>;
    requestFullScreen(): void;
    exitFullScreen(): void;
    supported(): boolean;
    shouldShowButton(): boolean;
    isFullScreen(): boolean;
    onFullScreenChange(t: any): void;
}
declare class RewardKeysManager {
    init(): Promise<void>;
}
declare class PilgrimAchievementManager {
    #private;
    constructor(t: any, e: any);
    reportVisitedMap(t: any): void;
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
    peliSdkPromise: Promise<PeliSdk | null>;
    peliSdk: PeliSdk | null;
    gameWrapper: HTMLElement | null;
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
export {};
