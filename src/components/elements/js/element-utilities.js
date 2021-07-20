/**
 * Making the given element resizeable
 */

function resizable(element, resizer) {

    resizer.addEventListener("mousedown", initDrag, false)
    element.addEventListener("mousedown", dragable, false)

    var startX, startY, startWidth, startHeight

    function initDrag(e) {
        if (e.target.className === 'resizer') { // If Clicking on the resizer
            startX = e.clientX
            startY = e.clientY
            startWidth = parseInt(
                document.defaultView.getComputedStyle(element).width,
                10
            )
            startHeight = parseInt(
                document.defaultView.getComputedStyle(element).height,
                10
            )
            document.documentElement.addEventListener("mousemove", doDrag, false)
            document.documentElement.addEventListener("mouseup", stopDrag, false)
        }
    }
    function doDrag(e) {
        element.style.width = startWidth + e.clientX - startX + "px"
        element.style.height = startHeight + e.clientY - startY + "px"
    }

    function stopDrag(e) {
        document.documentElement.removeEventListener(
            "mousemove",
            doDrag,
            false
        )
        document.documentElement.removeEventListener(
            "mouseup",
            stopDrag,
            false
        )
        element.dispatchEvent(new Event("finishededitingelement"))
    }
}

/**
 * Adding border and resizer to the clicked element
 */

function click(element, classType) {
    element.addEventListener("mousedown", onClick, false)
    function onClick() {
        let selectedElements = document.getElementsByClassName('element selected')
        for (let index = 0; index < selectedElements.length; index++) {
            selectedElements[index].className = classType + " element"
        }
        element.className = classType + " element selected"
    }

}

/**
 * Making the given element draggable
 */

function dragable(element, classType) {

    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0

    // move the DIV from anywhere inside the DIV:
    element.onmousedown = dragMouseDown

    function dragMouseDown(e) {
        if (
            e.target.className.includes('element') ||
            e.target.offsetParent.className.includes('element') &&
            e.target.className === 'image') { // if dragging element or image element/variable
                e = e || window.event
                e.preventDefault()
                // get the mouse cursor position at startup:
                pos3 = e.clientX
                pos4 = e.clientY
                document.onmouseup = closeDragElement
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag
        }

        function elementDrag(e) {
            e = e || window.event
            e.preventDefault()
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX
            pos2 = pos4 - e.clientY
            pos3 = e.clientX
            pos4 = e.clientY
            // set the element's new position:
            element.style.top = element.offsetTop - pos2 + "px"
            element.style.left = element.offsetLeft - pos1 + "px"
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null
            document.onmousemove = null
            element.dispatchEvent(new Event("finishededitingelement"))
        }
    }
}
export default {
    resizable,
    dragable,
    click
}