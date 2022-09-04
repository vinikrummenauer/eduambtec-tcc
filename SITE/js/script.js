/*ScrollReveal().reveal('.col-12.col-md-10.offset-md-1', {delay: 200});

ScrollReveal().reveal('#featured-container', {delay: 200});

ScrollReveal().reveal('#info-container', {delay: 200});*/

const latInp = document.querySelector("#latitude")
const lonInp = document.querySelector("#longitude")
const nivelAr = document.querySelector("#nivel")
const nivelQualidade = document.querySelector("#qualidade")
const srchBtn = document.querySelector(".btn-success")

const appId = "4371f7c1fc37eb3d323b1c1339ec0c8b"
const link = "https://api.openweathermap.org/data/2.5/air_pollution"	

const getUserLocation = () => {
	// localização do aluno
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onPositionGathered, onPositionGatherError)
	} else {
		onPositionGatherError({ message: "Não foi possível acessar suas coordenadas." })
	}
}

const onPositionGathered = (pos) => {
	let lat = pos.coords.latitude.toFixed(4), lon = pos.coords.longitude.toFixed(4)

	// valores do input
	latInp.value = lat
	lonInp.value = lon

	// pegar api do ar
	getnivelAr(lat, lon)
}

const getnivelAr = async (lat, lon) => {
	// pegar api
	const rawData = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${appId}`).catch(err => {
		onPositionGatherError({ message: "Aconteceu algo de errado, provavelmente sua conexão." })
		console.log(err)
	})
	const airData = await rawData.json()
	setValuesOfAir(airData)
}

const setValuesOfAir = airData => {
	const aqi = airData.list[0].main.aqi
	let airStat = "", color = ""

	// setar valor do nivel do ar
	nivelAr.innerText = aqi

	// setar valor da qualidade do ar

	switch (aqi) {
		case 1:
			airStat = "Bom"
			color = "rgb(19, 201, 28)"
			break
			case 2:
				airStat = "Normal"
				color = "rgb(15, 134, 25)"
				break
			case 3:
				airStat = "Moderado"
				color = "rgb(201, 204, 13)"
				break
			case 4:
				airStat = "Ruim"
				color = "rgb(204, 83, 13)"
				break
		case 5:
			airStat = "Muito ruim"
			color = "rgb(204, 13, 13)"
			break
		default:
			airStat = "Desconhecido"
	}

	nivelQualidade.innerText = airStat
	nivelQualidade.style.color = color
}

/*const setComponentsOfAir = airData => {
	let components = {...airData.list[0].components}
	componentsEle.forEach(ele => {
		const attr = ele.getAttribute('data-comp')
		ele.innerText = components[attr] += " μg/m³"
	})
}*/

const onPositionGatherError = e => {
	errorLabel.innerText = e.message
}

srchBtn.addEventListener("click", () => {
	getnivelAr(parseFloat(latInp.value).toFixed(4), parseFloat(lonInp.value).toFixed(4))
})

getUserLocation()
