 const originalBtn = document.getElementById('btn');

        const clonedBtn = originalBtn.cloneNode(true);

        clonedBtn.id = "btn-cloned";

        document.body.appendChild(clonedBtn);