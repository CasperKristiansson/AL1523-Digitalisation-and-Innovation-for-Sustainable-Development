// Export a function that takes in a list of classifications and returns a list of classifications with the counts
// of each classification type.
// It will recieve: 
// const [state, setState] = React.useState({
//     location: "",
//     depth: "",
//     surfaceType: "",
//     s: "",
//     ca: "",
//     fe: "",
//     pHinit: "",
//     pHox: "",
// });

// It will return:
// const [result, setResult] = React.useState({
//     controlA0D2: "",
//     controlD2A0: "",
//     logicalTest: "",
//     soilClassification: "",
//     borderZoneA: "",
//     borderZoneB: "",
// });

// Define Classification
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

// Create a interface for const check = {
    //     a0: checkA0(classificationsState),
    //     a1: checkA1(classificationsState),
    //     b0: checkB0(classificationsState),
    //     c1: checkC1(classificationsState),
    //     c2: checkC2(classificationsState),
    //     d1: checkD1(classificationsState),
    //     d2: checkD2(classificationsState),
    // };

interface Check {
    a0: Boolean;
    a1: Boolean;
    b0: Boolean;
    c1: Boolean;
    c2: Boolean;
    d1: Boolean;
    d2: Boolean;
}

export const computeClassification = (classificationsState: ClassificationState): Classification => {
    const check: Check = {
        a0: checkA0(classificationsState),
        a1: checkA1(classificationsState),
        b0: checkB0(classificationsState),
        c1: checkC1(classificationsState),
        c2: checkC2(classificationsState),
        d1: checkD1(classificationsState),
        d2: checkD2(classificationsState),
    };

    const A0D2 = controlA0D2(check);
    const D2A0 = controlD2A0(check);

    const result: Classification = {
        controlA0D2: A0D2,
        controlD2A0: D2A0,
        logicalTest: logicalTest(A0D2, D2A0),
        soilClassification: "",
        borderZoneA: "",
        borderZoneB: "",
    };

    return {
        controlA0D2: "",
        controlD2A0: "",
        logicalTest: "",
        soilClassification: "",
        borderZoneA: "",
        borderZoneB: "",
    };
}

function controlA0D2(check: Check): string {
    switch (true) {
        case check.a0 === true:
            return "A0) ej sulfidjord";
        case check.a1 === true:
            return "A1) Sulfidjord med försumbar försurningsrisk";
        case check.b0 === true:
            return "B) Sulfidjord låg försurningsrisk";
        case check.c1 === true:
            return "C1) Sur sulfatjord låg försurningsrisk";
        case check.c2 === true:
            return "C2) Sur sulfatjord med försurningsrisk";
        case check.d1 === true:
            return "D1) Sulfidjord utan buffringsförmåga, hög försurningsrisk";
        case check.d2 === true:
            return "D2) Sulfidjord utan buffringsförmåga, mycket hög försurningsrisk";
        default:
            return "";
    }
      
}

function controlD2A0(check: Check): string {
    switch (true) {
        case check.d2:
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
        default:
            return "";
    }
}

function logicalTest(controlA0D2: string, controlD2A0: string): string {
    if (controlA0D2 === controlD2A0) {
        return "OK";
    } else if (controlA0D2 < controlD2A0) {
        return "Gränszon";
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
function checkD2(classificationsState: ClassificationState): Boolean {
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