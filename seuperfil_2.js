document.addEventListener('DOMContentLoaded', () => {
    const concluirButton = document.querySelector('.button-concluir');
    const voltarButton = document.querySelector('.button-voltar');

    const coisasTextarea = document.querySelector('.bio-block textarea.editable-textarea');
    const fraseInput = document.querySelector('.bio-block input[type="text"][placeholder="Descreva-se em uma frase."]');
    const moodInput = document.querySelector('.bio-block input[type="text"][placeholder="Qual seu mood atual?"]');

    const profilePageUrl = 'seuperfil.html';

    if (concluirButton) {
        concluirButton.addEventListener('click', () => {

            const coisas = coisasTextarea ? coisasTextarea.value.trim().split('\n').filter(c => c.trim() !== '') : [];
            const frase = fraseInput ? fraseInput.value.trim() : '';
            const mood = moodInput ? moodInput.value.trim() : '';

            const profileData = {
                coisas: coisas.slice(0, 3), 
                fraseBio: frase,
                moodAtual: mood
            };

            localStorage.setItem('userProfileData', JSON.stringify(profileData));
            
            alert('Perfil atualizado'); 

            window.location.href = profilePageUrl;
        });
    }

    if (voltarButton) {
        voltarButton.addEventListener('click', () => {
            console.log('Alterações canceladas');
            window.location.href = profilePageUrl;
        });
    }
});
