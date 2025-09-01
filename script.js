const BASE_URL = "https://fordemo-ot4j.onrender.com";

document.getElementById("registerBtn").addEventListener("click", async() => {
    const name = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (!name || !pass){
        alert("Please fill in all fields.");
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: name, password: pass})
    });

        if (res.ok) {
            alert("User added!");
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        } else {
            alert ("Error adding user.");
        } 
    } catch (err) {
        console.error(err);
        alert("Network error.");
    }
});

document.getElementById("loadUsersBtn").addEventListener("click", async () => {
    try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        const users = data.users || [];

        const output = document.getElementById("usersList");
        output.innerHTML = "";

        if(users.length === 0) {
            output.textContent = "No users found.";
        } else {
            output.innerHTML = users.map(u => `<p>${u.username}</p>`).join("");
        }
    } catch(err) {
        console.error(err);
        alert("Error loading users.");
    }
});