(function () {
    const PROJECT_URL =
        "https://raw.githubusercontent.com/EEEE842/test/main/test.sb3";

    function getScratchVM() {
        if (location.hostname === "turbowarp.org") return window.vm;

        const app = document.getElementById("app");
        if (!app) return null;

        const key = Object.keys(app).find(k =>
            k.startsWith("__reactContainer$")
        );

        if (key) {
            try {
                const store =
                    app[key].child?.pendingProps?.store ||
                    app[key].child?.memoizedProps?.store;
                return store.getState().scratchGui.vm;
            } catch {}
        }
        return null;
    }

    const vm = getScratchVM();
    if (!vm) return alert("VM not found");

    vm.runtime.canAddCloudVariable = () => true;

    fetch(PROJECT_URL)
        .then(r => r.arrayBuffer())
        .then(b => vm.loadProject(b))
        .then(() => alert("Nova Menu loaded"));
})();
