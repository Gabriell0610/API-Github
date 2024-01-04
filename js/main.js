const nameInput = document.querySelector('#name-input');
const contentMain= document.querySelector('#content-main');
const imgPerson = document.querySelector('#img-person')
const nickname = document.querySelector('#nickname')

async function getApi(username) {
    try {
        const url = `https://api.github.com/users/${username}/repos`
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Erro HTTP! Status: ${res.status}`)
        }

        const data = await res.json()
        return data
    } catch (error) {
        throw new Error (`Erro ao buscar dados: ${error.message}`)
    }
}

async function showResults(username) {
    try {
        const data = await getApi(username)
        const newHTML = data.map((item)=> {
            nickname.innerHTML= item.owner.login
            imgPerson.src = item.owner.avatar_url
            if(item.language === null) {
                return
            }

            return generateHmtl(item)
            
            
        }).join('')

        contentMain.innerHTML = newHTML
    } catch (error) {
        throw new Error (`Erro encontrado ${error}`)
    }

}

function colorLanguage(language) {
    
    switch(language) {
        case 'JavaScript':
            return  'javascript';
            break
        case 'Java':
            return 'java';
            break
        case 'TypeScript':
            return  'typescript';
            break  
        case 'C#':
            return 'csharp'    ;
            break 
        case 'Python':
            return 'python'
            break 
        case 'HTML':
            return 'html'
            break
        case 'CSS':
            return 'css';
            break
        case 'C':
            return 'c';
        case 'C++':
            return 'cc';
        default:
            return 'colors'           
    }
}

function generateHmtl(item) {
    console.log(item)
    const languageColor = colorLanguage(item.language)
    return `
        <div class="card-content">
            <div class="div">
                <p class="name-project">${item.name}</p>
            </div>
            <div class="div">
                <div class="see-cod">
                    <a href="${item.html_url}" target="_blank">Ver Código <i class="fa-solid fa-code"></i> </a>
                </div>
                <span class="language"><span class="circle ${languageColor}"></span>${item.language}</span>
            </div>
        </div>
    `
}



nameInput.addEventListener('input', (e) =>  {
    const username = nameInput.value
    showResults(username)
})

