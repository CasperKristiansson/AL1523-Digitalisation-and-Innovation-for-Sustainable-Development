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
    s: string;
    ca: string;
    fe: string;
    pHinit: string;
    pHox: string;
}

export interface Classification {
    controlA0D2: string;
    controlD2A0: string;
    logicalTest: string;
    soilClassification: string;
    borderZoneA: string;
    borderZoneB: string;
}

export const computeClassification = (classifications: ClassificationState): Classification => {
    return {
        controlA0D2: "",
        controlD2A0: "",
        logicalTest: "",
        soilClassification: "",
        borderZoneA: "",
        borderZoneB: "",
    };
}
