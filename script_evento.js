document.addEventListener('DOMContentLoaded', () => {
    const detailsButtons = document.querySelectorAll('.btn-details');
    const eventDetailsColumn = document.querySelector('.event-details-column');
    const detailsPlaceholder = document.querySelector('.details-placeholder');
    const createEventForm = document.querySelector('.create-event-form');
    const btnIconLocation = createEventForm.querySelector('.btn-icon:nth-child(1)');
    const btnIconImage = createEventForm.querySelector('.btn-icon:nth-child(2)');
    const btnCreateEvent = createEventForm.querySelector('.btn-create-event');
    const eventList = document.querySelector('.events-list');

    let newEventHasLocation = false;
    let newEventHasImage = false;
  
    const DEFAULT_EVENT_HTML = `
        <div class="details-content">
            <div class="details-header">
                <img src="img/atletica_adm.png" alt="Avatar da Atlética" class="details-avatar">
                <h3>Acende o farol - Atlética ADM</h3>
            </div>
            
            <div class="details-body">
                <div class="presence-box">
                    <span class="presence-count">143</span>
                    <p>Confirmaram presença</p>
                    <button class="btn-confirm-presence">Confirmar presença</button>
                </div>
                
                <img src="img/acende_o_farol_poster.png" alt="Poster do Evento" class="details-poster">
            </div>
        
            <div class="map-box">
                <h4>Como chegar?</h4>
                <div class="map-content">
                    <button class="btn-open-map">Abrir mapa</button>
                    <img src="img/mapa_praia.png" alt="Mapa" class="map-thumbnail">
                </div>
            </div>
        </div>
    `;

    function showEventDetails(eventTitle, eventDescription, hasImage, hasLocation, isDefault = false) {
        if (detailsPlaceholder) {
            detailsPlaceholder.style.display = 'none';
        }
        eventDetailsColumn.classList.add('active-details');

        let detailsContentHTML = '';

        if (isDefault || eventTitle.includes("Acende o farol")) {
            detailsContentHTML = DEFAULT_EVENT_HTML;
        } else {
            const descHTML = eventDescription ? `<p style="margin-top: 10px; font-size: 0.95rem; color: #555;">${eventDescription}</p>` : '';
            const posterSrc = hasImage ? 'img/imagem_selecionada.png' : 'img/poster_default_vazio.png'; 
            
            const mapBoxContent = hasLocation ? 
                `<div class="map-content">
                    <button class="btn-open-map">Abrir mapa</button>
                    <img src="img/mapa_selecionado.png" alt="Mapa" class="map-thumbnail">
                </div>` :
                `<p style="text-align: center; color: white; font-weight: 700; margin: 0;">Localização não definida.</p>`;

            detailsContentHTML = `
                <div class="details-content">
                    <div class="details-header">
                        <img src="img/atletica_adm.png" alt="Avatar da Atlética" class="details-avatar">
                        <h3>${eventTitle}</h3>
                        ${descHTML}
                    </div>
                    
                    <div class="details-body">
                        <div class="presence-box">
                            <span class="presence-count">0</span>
                            <p>Confirmaram presença</p>
                            <button class="btn-confirm-presence">Confirmar presença</button>
                        </div>
                        
                        <img src="${posterSrc}" alt="Poster do Evento" class="details-poster">
                    </div>
                
                    <div class="map-box">
                        <h4>Como chegar?</h4>
                        ${mapBoxContent}
                    </div>
                </div>
            `;
        }


        eventDetailsColumn.innerHTML = detailsContentHTML;

        const btnOpenMap = document.querySelector('.btn-open-map');
        if (btnOpenMap) {
            btnOpenMap.addEventListener('click', () => {
                const mapURL = 'https://www.openstreetmap.org/';
                window.open(mapURL, '_blank');
            });
        }
    }

    detailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const eventItem = event.target.closest('.event-item');
            const eventTitle = eventItem.querySelector('.event-info p').textContent.trim();
            
            if (eventTitle.includes("Acende o farol") || eventTitle.includes("Farofa do Kat")) {
                showEventDetails(eventTitle, '', false, false, true); 
            } else {
                showEventDetails(eventTitle, '', false, false, false);
            }
        });
    });

    btnIconLocation.addEventListener('click', (event) => {
        event.preventDefault();
        
        const mapContainer = document.createElement('div');
        mapContainer.id = 'map-preview';
        mapContainer.style.height = '200px';
        mapContainer.style.marginTop = '10px';
        mapContainer.style.border = '3px solid #5D9CEC';
        mapContainer.style.borderRadius = '8px';
        mapContainer.style.backgroundColor = '#ecf0f1';
        mapContainer.style.display = 'flex';
        mapContainer.style.alignItems = 'center';
        mapContainer.style.justifyContent = 'center';
        mapContainer.style.color = '#5D9CEC';
        mapContainer.style.fontWeight = '700';
        mapContainer.textContent = 'Localização Selecionada (Mapa Simulado)';


        const existingMap = createEventForm.querySelector('#map-preview');
        if (existingMap) {
            existingMap.remove();
            newEventHasLocation = false;
        } else {
            createEventForm.insertBefore(mapContainer, createEventForm.querySelector('.form-actions'));
            newEventHasLocation = true;
        }

    });

    btnIconImage.addEventListener('click', (event) => {
        event.preventDefault();
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.click();

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                newEventHasImage = true;
            } else {
                newEventHasImage = false;
            }
        });
    });

    btnCreateEvent.addEventListener('click', (event) => {
        event.preventDefault();

        const titleInput = createEventForm.querySelector('input[placeholder="Título"]');
        const descInput = createEventForm.querySelector('input[placeholder="Descrição"]');
        const title = titleInput.value.trim() || 'Novo Evento Sem Título';
        const description = descInput.value.trim();
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const dateString = `${day}/${month}`;
        
        const newEventHasImageLocal = newEventHasImage;
        const newEventHasLocationLocal = newEventHasLocation;

        const newEventItem = document.createElement('div');
        newEventItem.className = 'event-item';
        newEventItem.innerHTML = `
            <img src="img/atletica_adm.png" alt="Avatar do Evento">
            <div class="event-info">
                <p>${title}</p>
                <button class="btn-details">Mais detalhes</button>
            </div>
            <span class="event-date">${dateString}</span>
        `;
        
        eventList.appendChild(newEventItem);

        
        newEventItem.querySelector('.btn-details').addEventListener('click', (e) => {
            showEventDetails(title, description, newEventHasImageLocal, newEventHasLocationLocal, false);
        });

        
        showEventDetails(title, description, newEventHasImageLocal, newEventHasLocationLocal, false);

        titleInput.value = '';
        descInput.value = '';
        const existingMap = createEventForm.querySelector('#map-preview');
        if (existingMap) {
            existingMap.remove();
        }
        newEventHasImage = false;
        newEventHasLocation = false;
    });

});