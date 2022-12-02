import { defineStore } from "pinia";

// stores are used where data is required globally, across components.
export const useEnvironmentStore = defineStore("environment", {
    
    // state defines the values this store holds
    state: () => (
        { 
            appStatus: 'purple', 
            buildId: 0, 
            dataLocation: '' 
        })
});