AFRAME.registerComponent("marker-handler", {

    init : async function () {

        var toys = await this.getToys();

        this.el.addEventListener("markerFound", () => {
            var markerId = this.el.id;
            this.handleMarkerFound(toys, markerId);
        })

        this.el.addEventListener("markerLost", () => {
            this.handleMarkerLost();
        })

    },

    handleMarkerFound : function (toys, markerId) {

        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";

        var orderButton = document.getElementById("order-button");
        orderButton.addEventListener("click", () => {
            swal ({
                icon : "success",
                title : "Thanks For Ordering",
                text : "You Will Get Your Order Soon...!"
            })
        })

        var summaryButton = document.getElementById("summary-button");
        summaryButton.addEventListener("click", () => {
            swal ({
                icon : "warning",
                title : "SUMMARY",
                text : "WORK IN PROGRESS !!"
            })
        })

        var toy = toys.filter(toy => toy.id === markerId)[0];

        var model = document.querySelector(`#model-${toy.id}`);
        model.setAttribute("position", toy.model_geometry.position);
        model.setAttribute("rotation", toy.model_geometry.rotation);
        model.setAttribute("scale", toy.model_geometry.scale);

    },

    handleMarkerLost :  function () {

        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";

    },

    getToys : async function () {

        return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
        })

    }

})