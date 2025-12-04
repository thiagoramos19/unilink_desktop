document.addEventListener('DOMContentLoaded', () => {
    const USUARIO_LOGADO = {
        nome: "Fulano",
        info: "CCET - Sistemas de Informação",
        avatar: "img/fulano.png"
    };
    
    const AVATAR_VENDEDOR_DEFAULT = "img/ciclano.png"; 

    const btnCriarOferta = document.querySelector('.btn-create-offer');
    const inputDescricao = document.querySelector('.create-offer-form input[type="text"]:not(.input-price)');
    const inputPreco = document.querySelector('.create-offer-form .input-price');
    const offersList = document.querySelector('.offers-list');
    const chatColumn = document.querySelector('.chat-column');

    if (btnCriarOferta && inputDescricao && inputPreco && offersList) {
        btnCriarOferta.addEventListener('click', (event) => {
            event.preventDefault();

            const descricao = inputDescricao.value.trim();
            let preco = inputPreco.value.trim();

            if (descricao === '' || preco === '') {
                alert('Por favor, preencha a descrição e o preço da oferta.');
                return;
            }

            if (!preco.toUpperCase().startsWith('R$')) {
                preco = `R$ ${preco}`;
            }

            const novaOfertaHTML = `
                <div class="offer-item">
                    <img src="${USUARIO_LOGADO.avatar}" alt="Avatar do usuário">
                    <div class="offer-details">
                        <p class="user-info">${USUARIO_LOGADO.nome} - ${USUARIO_LOGADO.info}</p>
                        <p class="offer-desc">${descricao}</p>
                    </div>
                    <div class="offer-action">
                        <button class="btn-buy">Comprar!</button>
                        <span class="offer-price">${preco}</span>
                    </div>
                </div>
            `;

            offersList.insertAdjacentHTML('afterbegin', novaOfertaHTML);
            inputDescricao.value = '';
            inputPreco.value = '';
            adicionarListenersAOfertas();
        });
    }

    function renderizarChat(userNameInfo, userAvatar) {
        const chatContentHTML = `
            <div class="active-chat-container" style="display: flex; flex-direction: column; width: 100%; height: 100%;">
                
                <div class="chat-header" style="display: flex; align-items: center; padding: 15px; border-bottom: 1px solid #e0e0e0; background-color: #ffffff;">
                    <img src="${userAvatar}" alt="Avatar do Vendedor" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 15px;">
                    <h2 style="margin: 0; font-size: 1rem; font-weight: 700; color: #333;">${userNameInfo}</h2>
                </div>
                
                <div class="messages-area" style="flex-grow: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; background-color: #ffffff;">
                    
                    <div style="align-self: flex-end; background-color: #4f603e;; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; max-width: 70%; font-size: 0.95rem;">
                        Tenho interesse, ainda está disponível?
                    </div>
                </div>
                
                <div class="message-input-area" style="padding: 15px; border-top: 1px solid #e0e0e0; display: flex;">
                    <div style="background-color: #4f603e; border-radius: 25px; flex-grow: 1; display: flex; align-items: center; padding: 10px 20px;">
                        <input type="text" id="message-text" placeholder="Digite uma mensagem..." style="border: none; background: transparent; color: #e0e0e0; flex-grow: 1; font-size: 1rem; outline: none;">
                    </div>
                    <button id="send-message-btn" style="width: 50px; height: 50px; border-radius: 50%; background-color: #e5a1ae; color: #e0e0e0; border: none; margin-left: 10px; font-weight: bold; cursor: pointer;">
                        >
                    </button>
                </div>
            </div>
        `;

        chatColumn.innerHTML = chatContentHTML;

        const inputMsg = document.getElementById('message-text');
        const btnEnviar = document.getElementById('send-message-btn');
        const messagesArea = chatColumn.querySelector('.messages-area');

        function enviarMensagem() {
            const message = inputMsg.value.trim();
            if (message !== '') {
                const newMsg = document.createElement('div');
                newMsg.textContent = message;
                newMsg.style.cssText = 'align-self: flex-end; background-color: #c9c9c9; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; max-width: 70%; font-size: 0.95rem;';
                
                messagesArea.appendChild(newMsg);
                inputMsg.value = '';
                messagesArea.scrollTop = messagesArea.scrollHeight;
            }
        }

        btnEnviar.addEventListener('click', enviarMensagem);
        inputMsg.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                enviarMensagem();
            }
        });
    }

    function adicionarListenersAOfertas() {
        const buyButtons = document.querySelectorAll('.offer-action .btn-buy');
        
        buyButtons.forEach(buyButton => {
            buyButton.removeEventListener('click', handleBuyButtonClick);
            buyButton.addEventListener('click', handleBuyButtonClick);
        });
    }

    function handleBuyButtonClick(event) {
        event.preventDefault();

        const offerItem = event.target.closest('.offer-item');
        if (!offerItem) return;

        const userInfoElement = offerItem.querySelector('.user-info');
        const userAvatarElement = offerItem.querySelector('img');

        const userInfoText = userInfoElement ? userInfoElement.textContent : 'Usuário Desconhecido';
        const userAvatarSrc = userAvatarElement ? userAvatarElement.src : AVATAR_VENDEDOR_DEFAULT;
        
        renderizarChat(userInfoText, userAvatarSrc);
    }

    adicionarListenersAOfertas();
});