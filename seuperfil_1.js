document.addEventListener('DOMContentLoaded', () => {
    const EDIT_PAGE_URL = 'seuperfil_2.html'; 

    const editButton = document.querySelector('.edit-bio-button');

    const bioListItems = document.querySelectorAll('.bio-list li');
    const bioPhraseElement = document.querySelector('.bio-phrase');
    const bioMoodElement = document.querySelector('.bio-mood');

    
    if (editButton) {
        editButton.addEventListener('click', () => {
      
            window.location.href = EDIT_PAGE_URL;
        });
    }


    const loadProfileData = () => {
        const savedData = localStorage.getItem('userProfileData');
        
        if (savedData) {
            const data = JSON.parse(savedData);

        
            if (data.coisas && bioListItems.length === 3) {
                bioListItems[0].textContent = data.coisas[0] || '---';
                bioListItems[1].textContent = data.coisas[1] || '---';
                bioListItems[2].textContent = data.coisas[2] || '---';
            }

            if (data.fraseBio && bioPhraseElement) {
                bioPhraseElement.textContent = `"${data.fraseBio}"`;
            }

            if (data.moodAtual && bioMoodElement) {
                bioMoodElement.textContent = `"${data.moodAtual}"`;
            }
        }
    };

    loadProfileData();
});
