AFRAME.registerComponent("create-markers", {

    init : async function () {

        var scene = document.querySelector("#scene");
        var toys = await this.getAllToys();
        toys.map(toy => {
            var marker = document.createElement("a-marker");
            marker.setAttribute("id", toy.id);
            marker.setAttribute("type", "pattern");
            marker.setAttribute("url", toy.marker_pattern_url);
            marker.setAttribute("cursor", {rayOrigin : "mouse"});
            marker.setAttribute("marker-handler", {});
            scene.appendChild(marker);

            var model = document.createElement("a-entity");
            model.setAttribute("id", `model-${toy.id}`);
            model.setAttribute("position", toy.model_geometry.position);
            model.setAttribute("rotation", toy.model_geometry.rotation);
            model.setAttribute("scale", toy.model_geometry.scale);
            model.setAttribute("gltf-model", `url(${toy.model_url})`);
            model.setAttribute("gesture-handler", {});
            model.setAttribute("animation-mixer", {});
            marker.appendChild(model)

            var mainPlane = document.createElement("a-plane");
            mainPlane.setAttribute("id", `main-plane-${toy.id}`);
            mainPlane.setAttribute("position", {x : 0, y : 0, z : 0});
            mainPlane.setAttribute("rotation", {x : -90, y : 0, z : 0});
            mainPlane.setAttribute("material", {color : "white"});
            mainPlane.setAttribute("width", 2.3);
            mainPlane.setAttribute("height", 2.5);
            marker.appendChild(mainPlane);

            var title = document.createElement("a-plane");
            title.setAttribute("id", `title-${toy.id}`);
            title.setAttribute("position", {x : 0, y : 1.1, z : 0.1});
            title.setAttribute("rotation", {x : 0, y : 0, z : 0});
            title.setAttribute("width", 2.31);
            title.setAttribute("height", 0.4);
            title.setAttribute("material", {color : "#fd7094"});
            mainPlane.appendChild(title);

            var toyTitle = document.createElement("a-entity");
            toyTitle.setAttribute("id", `toy-title-${toy.id}`);
            toyTitle.setAttribute("position", {x : 1.3, y : 0, z : 0.1});
            toyTitle.setAttribute("rotation", {x : 0, y : 0, z : 0});
            toyTitle.setAttribute("text", {
                font : "dejavu",
                color : "black",
                width : 4.5,
                height : 3,
                align : "left",
                value : toy.toy_name.toUpperCase()
            })
            title.appendChild(toyTitle);

            var description = document.createElement("a-entity");
            description.setAttribute("id", `description-${toy.id}`);
            description.setAttribute("position", {x : 0.04, y : 0, z : 0.1});
            description.setAttribute("rotation", {x : 0, y : 0, z : 0});
            description.setAttribute("text", {
                font : "dejavu",
                color : "black",
                width : 2,
                height : 5,
                letterSpacing : 2,
                lineHeight : 50,
                align : "left",
                value : `${toy.description}`
            })
            mainPlane.appendChild(description);

            var age = document.createElement("a-entity");
            age.setAttribute("id", `age-${toy.id}`);
            age.setAttribute("position", {x : -0.75, y : -0.8, z : 0.1});
            age.setAttribute("rotation", {x : 0, y : 0, z : 0});
            age.setAttribute("text", {
                font : "dejavu",
                color : "black",
                width : "2", 
                height : "5",
                align : "center",
                value : `AGE : ${toy.age_group}`
            })
            mainPlane.appendChild(age);
        })

    },

    getAllToys : async function () {

        return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
        })

    }

})