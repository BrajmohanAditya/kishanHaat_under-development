async function testLogin() {
    try {
        console.log("Sending login request...");
        const response = await fetch('http://127.0.0.1:8000/user/login-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            })
        });

        console.log("Response Status:", response.status);
        const text = await response.text();
        console.log("Response Text:", text); // Print raw text to see HTML error message
        // const data = JSON.parse(text); 
        // console.log("Response Data:", data);
    } catch (error) {
        console.log("Error:", error.message);
    }
}

testLogin();
