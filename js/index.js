let search = document.getElementById('search'); 
let form = document.getElementById('github-form');
let userList = document.getElementById('user-list');
let reposList = document.getElementById('repos-list');
let githubContainer = document.getElementById('github-container');


function searchUsers(event){
    event.preventDefault(); 
    fetch(`https://api.github.com/search/users?q=${search.value}`)
        .then(resp => resp.json())
        .then(data => {
            userList.innerHTML =""; 
            reposList.innerHTML=""
            for (let i in data.items){
                let li = document.createElement('li'); 
                li.setAttribute('style', 'background-color: #ccccFF; border: 1px solid black; margin-bottom: 10px; padding:10px; font-family: sans-serif;' )
                li.innerHTML = `<img src = "${data.items[i].avatar_url}" width= "35px" /> ${data.items[i].login}
                                <br />
                                Profile: <a href="${data.items[i].url}">${data.items[i].url}</a> 
                                <br />
                                <button class="repo-btn">View Repos</button>
                                `
                function showRepo(){
                    console.log('repo ' + data.items[i].login)
                    fetch(data.items[i].repos_url)
                    .then(response => response.json())
                    .then(repoData => {
                        reposList.innerHTML="";
                        for (let x of repoData){
                            
                            let repoLi = document.createElement('li'); 
                            repoLi.setAttribute('style', 'font-family: sans-serif; margin-bottom: 10px;')
                            repoLi.innerHTML = `${x.name}
                                                <br />
                                                <a href="${x.html_url}" target="_blank">Open Repo Page </a>`
                                                
                            reposList.appendChild(repoLi); 
                           
                        }
                    })
                }                
                li.addEventListener('click', showRepo)
                userList.appendChild(li); 
            }
        })

    search.value = ""; 
}




form.addEventListener('submit', searchUsers); 
