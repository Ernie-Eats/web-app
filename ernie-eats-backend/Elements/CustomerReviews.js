class CustomerReviews extends HTMLElement {

    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "customerReviews-wrapper");

        const customerReviews = wrapper.appendChild(document.createElement("a"));
        customerReviews.href = this.hasAttribute("customerReviews") ? this.getAttribute("customerReviews") : "index.html";
        customerReviews.text = "Customer Reviews";
        
        var h1 = document.createElement("H1");
        var r1header = document.createTextNode("The Cracked Pillar");
        h1.appendChild(r1header);
        let name1 = "Eric M.";
        let time1 = "a month ago";
        let rating1 = "3 out of 5 stars";
        document.innerHTML = name1 + ", " + time1 + "<br>" + "Rating: " + rating1;
        const review1 = document.createElement("R1");
        const node1 = document.createTextNode("Decent food and atmosphere, but I saw too many of my students there and it took away from the nice meal I wanted to share with my family");
        review1.appendChild(node1);
        document.body.appendChild(review1);

        var h2 = document.createElement("H2");
        var r2header = document.createTextNode("El Charro");
        h2.appendChild(r2header);
        let name2 = "Jen F";
        let time2 = "yesterday";
        let rating2 = "4 out of 5 stars";
        document.innerHTML = name2 + ", " + time2 + "<br>" + "Rating: " + rating2;
        const review2 = document.createElement("R2");
        const node2 = document.createTextNode("Hands down the best Mexican food in Bridgewater — I LOVE this place. The service was great, the food was delicious, and the margaritas had me feeling goooood. I will definitely be coming back and bringing more of my friends. Knocked them down to 4 stars because they don’t offer a marg tower");
        review2.appendChild(node2);
        document.body.appendChild(review2);

        var h3 = document.createElement("H3");
        var r3header = document.createTextNode("Magnolia's Tacos & Tequila Bar");
        h3.appendChild(r3header);
        let name3 = "Ben G.";
        let time3 = "a week ago";
        let rating3 = "1 out of 5 stars";
        document.innerHTML = name3 + ", " + time3 + "<br>" + "Rating: " + rating3;
        const review3 = document.createElement("R3");
        const node3 = document.createTextNode("I brought my girlfriend here for dinner last week and was not very impressed. Service was slow (even though the place was not very busy) and our queso was COLD. The margaritas are so overpriced, they aren’t even worth it. The portions weren’t big enough and I was still hungry when I left after paying a hefty bill. Probably will not be coming back for date night again."); 
        review3.appendChild(node3);
        document.body.appendChild(review3);

        var h4 = document.createElement("H4");
        var r4header = document.createTextNode("Bob A-Rea's Pizza & Subs");
        h4.appendChild(r4header);
        let name4 = "Chris A.";
        let time4 = "a year ago";
        let rating4 = "4 out of 5 stars";
        document.innerHTML = name4 + ", " + time4 + "<br>" + "Rating: " + rating4;
        const review4 = document.createElement("R4");
        const node4 = document.createTextNode("Obviously voted best pizza in town for a reason. Good food for a good price. Quiet place for a nice meal with family or friends");
        review4.appendChild(node4);
        document.body.appendChild(review4);

        var h5 = document.createElement("H5");
        var r5header = document.createTextNode("McDonald's");
        h5.appendChild(r5header);
        let name5 = "Karen C.";
        let time5 = "yesterday";
        let rating5 = "1 out of 5 stars";
        document.innerHTML = name5 + ", " + time5 + "<br>" + "Rating: " + rating5;
        const review5 = document.createElement("R5");
        const node5 = document.createTextNode("Everytime I go the ice cream machine is broken. Long line");
        review5.appendChild(node5);
        document.body.appendChild(review5);

        shadow.appendChild(wrapper);

    }
}

customElements.define("customer-reviews", CustomerReviews);
