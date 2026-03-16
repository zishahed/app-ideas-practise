const people = [
    { name: "Amara Osei", street: "14 Kanda Highway", city: "Accra", state: "Greater Accra", country: "Ghana", telephone: "+233 30 277 4412", birthday: "March 5, 1990" },
    { name: "Lena Hoffmann", street: "Unter den Linden 42", city: "Berlin", state: "Berlin", country: "Germany", telephone: "+49 30 4857 2291", birthday: "July 19, 1987" },
    { name: "Carlos Vega", street: "Calle Madero 88", city: "Mexico City", state: "CDMX", country: "Mexico", telephone: "+52 55 5123 9876", birthday: "November 30, 1993" },
    { name: "Priya Nair", street: "12B MG Road", city: "Bengaluru", state: "Karnataka", country: "India", telephone: "+91 80 4156 7823", birthday: "February 14, 1995" },
    { name: "James Whitfield", street: "308 Maple Ave", city: "Austin", state: "Texas", country: "USA", telephone: "+1 512 938 4420", birthday: "September 22, 1985" },
    { name: "Yuki Tanaka", street: "3-7 Shibuya", city: "Tokyo", state: "Tokyo", country: "Japan", telephone: "+81 3 5489 2310", birthday: "January 8, 1992" },
    { name: "Sofia Rossi", street: "Via Roma 67", city: "Naples", state: "Campania", country: "Italy", telephone: "+39 081 765 4321", birthday: "June 3, 1989" },
    { name: "Omar Hassan", street: "Al Tahrir St 21", city: "Cairo", state: "Cairo", country: "Egypt", telephone: "+20 2 2579 3344", birthday: "April 17, 1991" },
    { name: "Zunayed Iqbal Shahed", street: "5/6 E Mirpur 2", city: "Dhaka", state: "Dhaka", country: "Bangladesh", telephone: "+8801767595560", birthday: "March 25, 2005" },
];

const avatarColors = [
    "#4a6cf7", "#10b981", "#f59e0b",
    "#ef4444", "#8b5cf6", "#06b6d4",
    "#ec4899", "#14b8a6"
];

const ListElements = document.getElementById("list");
const rightPane    = document.getElementById("right-pane");

function getInitials(name) {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
}

people.forEach((person, index) => {
    const color = avatarColors[index % avatarColors.length];  // mainting a rotation
    const li = document.createElement("li");
    li.className = "person-item";
    li.dataset.index = index;
    li.innerHTML = `
                <div class="avatar" style="background: ${color}">
                    ${getInitials(person.name)}
                </div>
                <div class="item-info">
                    <div class="item-name">${person.name}</div>
                    <div class="item-sub">${person.city}, ${person.country}</div>
                </div>
            `;
    li.addEventListener("click", () => showDetails(index));
    ListElements.append(li);
});

function showDetails(index) {
    const person = people[index];
    const color = avatarColors[index % avatarColors.length];
    document.querySelectorAll(".person-item").forEach(el => el.classList.remove("active"));
    ListElements.children[index].classList.add("active");
    rightPane.innerHTML = `
                <div class="detail-view">
                    <div class="detail-header">
                        <div class="detail-avatar" style="background: ${color}">
                            ${getInitials(person.name)}
                        </div>
                        <div>
                            <div class="detail-name">${person.name}</div>
                            <div class="detail-location">${person.city}, ${person.state} &mdash; ${person.country}</div>
                        </div>
                    </div>
 
                    <div class="fields-grid">
                        <div class="field-card">
                            <div class="field-label">Street</div>
                            <div class="field-value">${person.street}</div>
                        </div>
                        <div class="field-card">
                            <div class="field-label">City</div>
                            <div class="field-value">${person.city}</div>
                        </div>
                        <div class="field-card">
                            <div class="field-label">State</div>
                            <div class="field-value">${person.state}</div>
                        </div>
                        <div class="field-card">
                            <div class="field-label">Country</div>
                            <div class="field-value">${person.country}</div>
                        </div>
                        <div class="field-card">
                            <div class="field-label">Telephone</div>
                            <div class="field-value">${person.telephone}</div>
                        </div>
                        <div class="field-card">
                            <div class="field-label">Birthday</div>
                            <div class="field-value">${person.birthday}</div>
                        </div>
                    </div>
                </div>
            `;
}