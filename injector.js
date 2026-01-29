(function () {
    const PROJECT_URL = window.ES_SELECTED_SB3;

    function getScratchVM() {
        if (window.location.hostname === "turbowarp.org") return window.vm;

        const app = document.getElementById("app");
        if (!app) return null;

        const key = Object.keys(app).find(k => k.startsWith("__reactContainer"));
        if (key) {
            try {
                const fiber = app[key];
                const store = fiber.child?.memoizedProps?.store;
                if (store) return store.getState().scratchGui.vm;
            } catch {}
        }

        if (app._reactRootContainer) {
            try {
                const store = app._reactRootContainer._internalRoot.current.child.pendingProps.store;
                return store.getState().scratchGui.vm;
            } catch {}
        }

        return null;
    }

    const vm = getScratchVM();
    if (!vm) {
        alert("VM not found");
        return;
    }

    vm.runtime.canAddCloudVariable = () => true;

    alert("loading injection");

    fetch(PROJECT_URL)
        .then(r => r.arrayBuffer())
        .then(buf => vm.loadProject(buf))
        .then(() => alert("injection complete"))
        .catch(e => {
            alert("Injection failed");
            console.error(e);
        });
})();
