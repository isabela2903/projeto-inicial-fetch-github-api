const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />    
                                <div class="data">
                                    <h1>${user.name ?? 'Não possui nome cadastrado 😓'}</h1>
                                    <p>${user.bio ?? 'Não possui bio cadastrada 😓'}</p>
                                    <br>
                                    <p>👥 Seguidores: ${user.followers}</p>
                                    <p>👥 Segundo: ${user.following}</p>
                                </div>
                                </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                                                    <ul class="repositories-info">
                                                                    <li>🍴 ${repo.forks}</li>
                                                                    <li>⭐ ${repo.stargazers_count}</li>
                                                                    <li>👀 ${repo.watchers}</li>
                                                                    <li>🧑‍💻 ${repo.language}</li>
                                                                    </ul>
                                                                </li>`)

        if(user.repositories.length >0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                           </div>`
        }
        let eventsItens = ''
        user.events.forEach(events => {
            if(events.type === "PushEvent"){
                eventsItens += `<div>
                                    <li>${events.repo.name} <span> - ${events.payload.commits[0].message}</span></li>
                                </div>`
            }else{
                eventsItens += `<div>
                                    <li>${events.repo.name} <span> - Sem mensagem de commit</span></li>
                                </div>`
            }
        })

        if(user.events.length > 0){
            this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Eventos</h2>
                                            <ul>${eventsItens}</ul>
                                           </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }