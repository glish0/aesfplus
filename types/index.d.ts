

export interface AboutDict {
    hero: {
        title: string;
        subtitle: string;
        description_1: string;
        description_2: string;
        description_3: string;
    };
    history: {
        title: string;
        content: string;
        details: string;
    };
    vision: {
        title: string;
        quote: string;
        description: string;
    };
    mission: {
        title: string;
        list: {
            title: string;
            description: string;
        }[];
    };
    objectives: {
        title: string;
        global: {
            title: string;
            description: string;
        };
        specific: {
            title: string;
            list: string[];
        };
    };
}