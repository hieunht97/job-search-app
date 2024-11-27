app.post("/set-cookie", (req, res) => {
  res.cookie("test-cookie", "test-value", {
    maxAge: 3600000, // 1 hour
    httpOnly: true,
    sameSite: "None",
    secure: false,
  });
  res.send("Cookie set");
});

app.get("/read-cookie", (req, res) => {
  console.log("Cookies received:", req.cookies);
  res.json(req.cookies);
});
