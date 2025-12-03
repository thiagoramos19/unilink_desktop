document.addEventListener('DOMContentLoaded', () => {
    
    const EDIT_PAGE_URL = 'seuperfil_2.html'; 

    const editButton = document.querySelector('.edit-bio-button');

    const bioListItems = document.querySelectorAll('.bio-list li'); 
    const bioPhraseElement = document.querySelector('.bio-phrase');
    const bioMoodElement = document.querySelector('.bio-mood');

    if (editButton) {
        editButton.addEventListener('click', () => {
            window.location.href = EDIT_PAGE_URL; 
            console.log('Redirecionando para a página de edição...');
        });
    } else {
        console.error("Erro: O botão com a classe '.edit-bio-button' não foi encontrado na página.");
    }

    const loadProfileData = () => {
        const savedData = localStorage.getItem('userProfileData');
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);

                if (data.coisas && bioListItems.length >= 3) {
                    bioListItems[0].textContent = data.coisas[0] ? data.coisas[0].trim() : '---';
                    bioListItems[1].textContent = data.coisas[1] ? data.coisas[1].trim() : '---';
                    bioListItems[2].textContent = data.coisas[2] ? data.coisas[2].trim() : '---';
                }

                if (data.fraseBio && bioPhraseElement) {
                    bioPhraseElement.textContent = `"${data.fraseBio}"`; 
                }

                if (data.moodAtual && bioMoodElement) {
                    bioMoodElement.textContent = `"${data.moodAtual}"`;
                }
            } catch (e) {
                console.error('Erro ao fazer parse dos dados do localStorage:', e);
            }
        }
    };

    loadProfileData(); 
});
