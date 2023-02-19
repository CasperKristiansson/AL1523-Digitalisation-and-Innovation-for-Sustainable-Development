export interface ClassificationState {
    location: string;
    depth: string;
    surfaceType: string;
    s: number;
    ca: number;
    fe: number;
    pHinit: number;
    pHox: number;
}

export interface Classification {
    controlA0D2: string;
    controlD2A0: string;
    logicalTest: string;
    soilClassification: string;
    borderZoneA: string;
    borderZoneB: string;
}

interface Check {
    a0: Boolean;
    a0_control: Boolean;
    a1: Boolean;
    b0: Boolean;
    c1: Boolean;
    c2: Boolean;
    d1: Boolean;
    d2_high: Boolean;
    d2_reduced: Boolean;
}

export const computeClassification = (classificationsState: ClassificationState): Classification => {
    const check: Check = {
        a0: checkA0(classificationsState),
        a0_control: checkA0Control(classificationsState),
        a1: checkA1(classificationsState),
        b0: checkB0(classificationsState),
        c1: checkC1(classificationsState),
        c2: checkC2(classificationsState),
        d1: checkD1(classificationsState),
        d2_high: checkD2High(classificationsState),
        d2_reduced: checkD2Reduced(classificationsState),
    };

    const A0D2 = controlA0D2(check);
    const D2A0 = controlD2A0(check);

    const result: Classification = {
        controlA0D2: A0D2,
        controlD2A0: D2A0,
        logicalTest: logicalTest(A0D2, D2A0),
        soilClassification: soilClassification(A0D2, D2A0),
        borderZoneA: borderZoneA(A0D2, D2A0),
        borderZoneB: borderZoneB(A0D2, D2A0),
    };

    return result;
}

// =IFS([@[A0) ej sulfidjord]]=TRUE;Tabell132[[#Headers];[A0) ej sulfidjord]];[@[A1) Sulfidjord med försumbar försurningsrisk]]=TRUE;Tabell132[[#Headers];[A1) Sulfidjord med försumbar försurningsrisk]];[@[B) Sulfidjord låg försurningsrisk]]=TRUE;+Tabell132[[#Headers];[B) Sulfidjord låg försurningsrisk]];[@[C1) Sur sulfatjord låg försurningsrisk]]=TRUE;Tabell132[[#Headers];[C1) Sur sulfatjord låg försurningsrisk]];[@[C2) Sur sulfatjord med försurningsrisk]]=TRUE;Tabell132[[#Headers];[C2) Sur sulfatjord med försurningsrisk]];[@[D1) Sulfidjord utan buffringsförmåga, hög försurningsrisk]]=TRUE;Tabell132[[#Headers];[D1) Sulfidjord utan buffringsförmåga, hög försurningsrisk]];[@[D2) Sulfidjord utan buffringsförmåga, mycket hög försurningsrisk]]=TRUE;Tabell132[[#Headers];[D2) Sulfidjord utan buffringsförmåga, mycket hög försurningsrisk]])
function controlA0D2(check: Check): string {
    switch (true) {
        case check.a0:
            return "A0) ej sulfidjord";
        case check.a1:
            return "A1) Sulfidjord med försumbar försurningsrisk";
        case check.b0:
            return "B) Sulfidjord låg försurningsrisk";
        case check.c1:
            return "C1) Sur sulfatjord låg försurningsrisk";
        case check.c2:
            return "C2) Sur sulfatjord med försurningsrisk";
        case check.d1:
            return "D1) Sulfidjord utan buffringsförmåga, hög försurningsrisk";
        case check.d2_high:
            return "D2) Sulfidjord utan buffringsförmåga, mycket hög försurningsrisk";
        case check.d2_reduced:
            return "D2) Sulfidjord utan buffringsförmåga, Reducerad försurningsrisk";
        case check.a0_control:
            return "A0) Kontrollera Järnhalten";
        default:
            return "";
    }
}

// =IFS([@[D2) Sulfidjord utan buffringsförmåga, mycket hög försurningsrisk]]=TRUE;Tabell132[[#Headers];[D2) Sulfidjord utan buffringsförmåga, mycket hög försurningsrisk]];[@[D1) Sulfidjord utan buffringsförmåga, hög försurningsrisk]]=TRUE;Tabell132[[#Headers];[D1) Sulfidjord utan buffringsförmåga, hög försurningsrisk]];[@[C2) Sur sulfatjord med försurningsrisk]]=TRUE;Tabell132[[#Headers];[C2) Sur sulfatjord med försurningsrisk]];[@[C1) Sur sulfatjord låg försurningsrisk]]=TRUE;Tabell132[[#Headers];[C1) Sur sulfatjord låg försurningsrisk]];[@[B) Sulfidjord låg försurningsrisk]]=TRUE;Tabell132[[#Headers];[B) Sulfidjord låg försurningsrisk]];[@[A1) Sulfidjord med försumbar försurningsrisk]]=TRUE;Tabell132[[#Headers];[A1) Sulfidjord med försumbar försurningsrisk]];[@[A0) ej sulfidjord]]=TRUE;Tabell132[[#Headers];[A0) ej sulfidjord]])
function controlD2A0(check: Check): string {
    switch (true) {
        case check.d2_high:
            return "D2) Sulfidjord utan buffringsförmåga, mycket hög försurningsrisk";
        case check.d1:
            return "D1) Sulfidjord utan buffringsförmåga, hög försurningsrisk";
        case check.c2:
            return "C2) Sur sulfatjord med försurningsrisk";
        case check.c1:
            return "C1) Sur sulfatjord låg försurningsrisk";
        case check.b0:
            return "B) Sulfidjord låg försurningsrisk";
        case check.a1:
            return "A1) Sulfidjord med försumbar försurningsrisk";
        case check.a0:
            return "A0) ej sulfidjord";
        case check.d2_reduced:
            return "D2) Sulfidjord utan buffringsförmåga, Reducerad försurningsrisk";
        case check.a0_control:
            return "A0) Kontrollera Järnhalten";
        default:
            return "";
    }
}

// =IFS([@[Kontroll A0-D2]]=[@[KontrollD2-A0]];"OK";[@[Kontroll A0-D2]]<[@[KontrollD2-A0]];"Gränszon")
function logicalTest(controlA0D2: string, controlD2A0: string): string {
    if (controlA0D2 === controlD2A0) {
        return "OK";
    } else if (controlA0D2 < controlD2A0) {
        return "Gränszon";
    } else {
        return "";
    }
}

// =IF([@[Kontroll A0-D2]]=[@[KontrollD2-A0]];[@[Kontroll A0-D2]];"Kontrollera (gränszon)")
function soilClassification(controlA0D2: string, controlD2A0: string): string {
    if (controlA0D2 === controlD2A0) {
        return controlA0D2;
    } else if (controlA0D2 < controlD2A0) {
        return "Kontrollera (gränszon)";
    } else {
        return "";
    }
}

// =IF([@[Kontroll A0-D2]]=[@[KontrollD2-A0]];"- ";[@[Kontroll A0-D2]])
function borderZoneA(controlA0D2: string, controlD2A0: string): string {
    if (controlA0D2 === controlD2A0) {
        return "-";
    } else if (controlA0D2 < controlD2A0) {
        return controlA0D2;
    } else {
        return "";
    }
}

// =IF([@[Kontroll A0-D2]]=[@[KontrollD2-A0]];"-";[@[KontrollD2-A0]])
function borderZoneB(controlA0D2: string, controlD2A0: string): string {
    if (controlA0D2 === controlD2A0) {
        return "-";
    } else if (controlA0D2 < controlD2A0) {
        return controlD2A0;
    } else {
        return "";
    }
}

// A0) Not Sulid soil = "D2" && s < 1000 && pHinit > 7.89 && pHox > 4.55 && fe/s > 9 && ca/s > 2.1
function checkA0(classificationsState: ClassificationState): Boolean {
    const feS = classificationsState.fe / classificationsState.s;
    const caS = classificationsState.ca / classificationsState.s;

    return (
        classificationsState.s < 1000 &&
        classificationsState.pHinit > 7.89 &&
        classificationsState.pHox > 4.55 &&
        feS > 9 &&
        caS > 2.1
    )
}

// A0 Control) Control The Iron Value = "D2" && s < 2500 && pHox > 5.01 && fe/s < 50.1001 && ca/s < 5
function checkA0Control(classificationsState: ClassificationState): Boolean {
    const feS = classificationsState.fe / classificationsState.s;
    const caS = classificationsState.ca / classificationsState.s;

    return (
        classificationsState.s < 2500 &&
        classificationsState.pHox > 5.01 &&
        feS < 50.1001 &&
        caS < 5
    )
}


// A1) Sulphide soil with negligible risk of acidification = "A0" && s > 100 && pHinit > 4.89 && pHox > 4.3 && fe/s > 15 && ca/s > 1 && s < 1500
function checkA1(classificationsState: ClassificationState): Boolean {
    const feS = classificationsState.fe / classificationsState.s;
    const caS = classificationsState.ca / classificationsState.s;

    return (
        classificationsState.s > 100 &&
        classificationsState.pHinit > 4.89 &&
        classificationsState.pHox > 4.3 &&
        feS > 15 &&
        caS > 1 &&
        classificationsState.s < 1500
    )
}

// B0) Sulphide soil low risk of acidification = "B0" && s > 900 && s < 3000 && pHinit > 5.59 && pHox > 4.3 && fe/s > 3 && fe/s < 25 && ca/s > 1.89 && ca/s < 4
function checkB0(classificationsState: ClassificationState): Boolean {
    const feS = classificationsState.fe / classificationsState.s;
    const caS = classificationsState.ca / classificationsState.s;

    return (
        classificationsState.s > 900 &&
        classificationsState.s < 3000 &&
        classificationsState.pHinit > 5.59 &&
        classificationsState.pHox > 4.3 &&
        feS > 3 &&
        feS < 25 &&
        caS > 1.89 &&
        caS < 4
    )
}

// C1) Acid sulfate soil low risk of acidification = "C1" && s > 200 && s < 1100 && pHinit < 5.5 && pHox < 5 && fe/s > 10 && ca/s > 2
function checkC1(classificationsState: ClassificationState): Boolean {
    const feS = classificationsState.fe / classificationsState.s;
    const caS = classificationsState.ca / classificationsState.s;

    return (
        classificationsState.s > 200 &&
        classificationsState.s < 1100 &&
        classificationsState.pHinit < 5.5 &&
        classificationsState.pHox < 5 &&
        feS > 10 &&
        caS > 2
    )
}

// C2) Acid sulfate soil with risk of acidification = "C2" && s > 1000 && pHinit < 5.9 && pHox > 2 && fe/s > 0.1 && fe/s < 21 && ca/s < 3.4
function checkC2(classificationsState: ClassificationState): Boolean {
    const feS = classificationsState.fe / classificationsState.s;
    const caS = classificationsState.ca / classificationsState.s;

    return (
        classificationsState.s > 1000 &&
        classificationsState.pHinit < 5.9 &&
        classificationsState.pHox > 2 &&
        feS > 0.1 &&
        feS < 21 &&
        caS < 3.4
    )
}

// D1) Sulphide soil without buffering capacity, high risk of acidification = "D1" && s > 1500 && s < 4000 && pHinit > 5.8 && pHox > 2 && fe/s > 3.9 && fe/s < 15 && ca/s > 0.6 && ca/s < 4.1
function checkD1(classificationsState: ClassificationState): Boolean {
    const feS = classificationsState.fe / classificationsState.s;
    const caS = classificationsState.ca / classificationsState.s;

    return (
        classificationsState.s > 1500 &&
        classificationsState.s < 4000 &&
        classificationsState.pHinit > 5.8 &&
        classificationsState.pHox > 2 &&
        feS > 3.9 &&
        feS < 15 &&
        caS > 0.6 &&
        caS < 4.1
    )
}

// D2) Sulphide soil without buffering capacity, very high risk of acidification = "D2" && s > 4000 && pHinit > 5.8 && fe/s > 0.1 && fe/s < 10 && ca/s < 4
function checkD2High(classificationsState: ClassificationState): Boolean {
    const feS = classificationsState.fe / classificationsState.s;
    const caS = classificationsState.ca / classificationsState.s;

    return (
        classificationsState.s > 4000 &&
        classificationsState.pHinit > 5.8 &&
        feS > 0.1 &&
        feS < 10 &&
        caS < 4
    )
}

// D2 Reduced) = "D2" && s > 4000 && pHinit > 5.8 && fe/s > 0.1 && fe/s < 10 && ca/s > 4
function checkD2Reduced(classificationsState: ClassificationState): Boolean {
    const feS = classificationsState.fe / classificationsState.s;
    const caS = classificationsState.ca / classificationsState.s;

    return (
        classificationsState.s > 4000 &&
        classificationsState.pHinit > 5.8 &&
        feS > 0.1 &&
        feS < 10 &&
        caS > 4
    )
}