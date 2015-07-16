function modifyDropDownMenu() {
	var nav = document.getElementById("userNavigation")

	var spacer = document.createElement("li")
	spacer.className = "menuDivider"
	nav.appendChild(spacer)

	var item = document.createElement("li")
	item.role = "menuitem"

	var link = document.createElement("a")
	link.className = "navSubmenu"
	link.href = "#"
	link.style.fontWeight = "bold"
	link.style.color = "#e6007f"
	link.onmouseover = function() {
		this.style.color = "#ffffff";
	}
	link.onmouseout = function() {
		this.style.color = "#e6007f";
	}
	link.onclick = function() {
		app.onSiteLinkClicked();
		return false;
	};
	link.innerHTML = "<img src='" + chrome.extension.getURL("resources/fb16.png") + "' style='display:block;float:left;margin-right:7px;' />FB Color Changer"
	item.appendChild(link)
	nav.appendChild(item)
}

function modifyShortCutList() {
	var container = document.getElementById('fbNotificationsJewel')

	if (container) {
		var div = document.createElement("div")
		div.className = "uiToggle _4962 _4xi2 west"

		var link = document.createElement("a")
		link.href = "#"
		link.style.display = "block"
		link.style.width = "31"
		link.style.height = "31"
		link.style.margin = "0"
		link.style.padding = "0"
		link.style.fontWeight = "bold"
		link.style.color = "#e6007f"
		link.onclick = function() {
			app.onSiteLinkClicked();
			return false;
		};
		link.innerHTML = "<img src='" + chrome.extension.getURL("resources/fb31.png") + "' style='display:block;' />"
		div.appendChild(link)
		//container.appendChild(div)
		container.parentNode.insertBefore(div, container.nextSibling);
	}
}


modifyDropDownMenu()
modifyShortCutList()

