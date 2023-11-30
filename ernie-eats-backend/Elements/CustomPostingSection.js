//***eventually needs to only be able to be seen/used by the business acccount user**
class PostSection extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="post-section">
          <div class="tabs">
            <div class="tab active" onclick="selectTab('Event')">Event</div>
            <div class="tab" onclick="selectTab('Post')">Post</div>
          </div>
  
          <div class="input-section">
            <input type="text" placeholder="Title">
            <textarea placeholder="Description" rows="5" cols="10" id="description"
            style="resize: none;"></textarea>
          </div>
  
          <button class="submit-btn" onclick="submitPost()">Submit</button>
        </div>
      `;
    }
}

customElements.define('post-section', PostSection);

//tab selection
function selectTab(tabType) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const selectedTab = Array.from(tabs).find(tab => tab.innerText === tabType);
    selectedTab.classList.add('active');
}

//post submission
function submitPost() {
    const title = document.querySelector('.input-section input').value;
    const description = document.querySelector('.input-section textarea').value;
    const selectedTab = document.querySelector('.tab.active').innerText;

    console.log(`Title: ${title}\nDescription: ${description}\nPost Type: ${selectedTab}`);
}


