<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim(strip_tags($_POST['name']));
    $visitor_email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    if (!$visitor_email) {
        header("Location: index.html?status=invalid_email");
        exit();
    }

    $email_from = 'vanpasie20@gmail.com'; // Update to your domain email
    $email_subject = "New Form Submission";
    $email_body = "User Name: $name\n".
                  "User Email: $visitor_email\n".
                  "User Message: $message\n";

    $to = "oluwaseyijohnson288@gmail.com"; // Update recipient email

    $headers = "From: $email_from\r\n";
    $headers .= "Reply-To: $visitor_email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $email_subject, $email_body, $headers)) {
        header("Location: index.html?status=success");
        exit();
    } else {
        header("Location: index.html?status=error");
        exit();
    }
} else {
    header("Location: index.html?status=invalid_request");
    exit();
}
?>
