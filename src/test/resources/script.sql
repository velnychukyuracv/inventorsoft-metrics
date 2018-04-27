/* This script fills the embedded test database with valid data */

/* ATTENTION!!! If you need to add some specific data for your purposes, please, do it according to
existing constraints and entity relationships. Do not change existing scripts, unless database structure
was changed. Inconsistent data may affect results of other tests */



/* This piece of code fills the "companies" table with valid data which has relationships in other tables */
/* This is company with valid email, facebook and google plus account  */
INSERT INTO companies (id,  created_at, updated_at, company_name, website, email, description, facebook_page_url, google_page_url, category_id, company_type, sign_up_steps, email_verified, rating, confirmation_token)
  VALUES (4, '2018-02-02', '2018-02-02', 'Brilliant Windows', 'http://www.brilliantwindows', 'vasyl.pahomenko2018@gmail.com', 'We are honest company',
        'https://www.facebook.com/vasyl.pahomenko.9', 'https://plus.google.com/105820838690530194142', '207', 'SHOP', E'\\xaced0005757200025b494dba602676eab2a5020000787000000006000000010000000000000000000000000000000000000000'::bytea, TRUE, 3.333, '');
INSERT INTO companies (id,  created_at, updated_at, company_name, website, email, description, facebook_page_url, google_page_url, category_id, company_type, sign_up_steps, email_verified, rating, confirmation_token)
  VALUES (5, '2018-01-01', '2018-01-01', 'Diamond Windows', 'http://www.diamondwindows', 'diamondwindows@gmail.com', 'We are best company',
        'facebook.diamondwindows', 'google.diamondwindows', '207', 'SHOP', E'\\xaced0005757200025b494dba602676eab2a5020000787000000006000000000000000000000000000000000000000000000000'::bytea, FALSE, 3.000, '');
INSERT INTO companies (id,  created_at, updated_at, company_name, website, email, description, facebook_page_url, google_page_url, category_id, company_type, sign_up_steps, email_verified, rating, confirmation_token)
  VALUES (6, '2018-02-01', '2018-02-01', 'Tooth Fairy', 'http://www.toothfairy', 'toolthfairy@gmail.com', 'We are dantist company',
        'facebook.toothfairy', 'google.toothfairy', '179', 'SHOP', E'\\xaced0005757200025b494dba602676eab2a5020000787000000006000000000000000000000000000000000000000000000000'::bytea, FALSE, 4.666, '');



/* This piece of code fills the "addresses" table with valid data which has relationships in other tables */
/* This address has valid phone number */
INSERT INTO addresses (id, created_at, updated_at, country, city, phone_number, street_address, zip_code, company_id)
VALUES (1, '2018-02-02', '2018-02-02', 'US', 'Chernigiv', '0996135265', 'Golovna, 26-A/45', '22069', 4);
INSERT INTO addresses (id, created_at, updated_at, country, city, phone_number, street_address, zip_code, company_id)
VALUES (2, '2018-01-01', '2018-01-01', 'US', 'Chernivtsi', '0507895214', 'prospect Nezalezhnosti, 65/36', '58029', 5);
INSERT INTO addresses (id, created_at, updated_at, country, city, phone_number, street_address, zip_code, company_id)
VALUES (3, '2018-02-01', '2018-02-01', 'US', 'New York', '0669872522', 'Ap #696-3279 5-th Avenue', 'NY 39531', 6);



/* This piece of code fills the "users" table with valid data which has relationships in other tables */
/* For that user password is: 12345qwerty This user has valid email*/
INSERT INTO users (id,  created_at, updated_at, first_name, last_name, email, hashed_password, role, company_id)
  VALUES (7, '2018-02-02', '2018-02-02', 'Vasyl', 'Pahomenko', 'vasyl.pahomenko2018@gmail.com', '$2a$10$r/Hl9vrviRnZmLhZJ5vNO.Y1dRt5wuKJB9PB1uWj/gD8noZ0COjrC', 'USER', 4);
/* For that user password is: qwerty12345 */
INSERT INTO users (id,  created_at, updated_at, first_name, last_name, email, hashed_password, role, company_id)
  VALUES (8, '2018-01-01', '2018-01-01', 'Peter', 'Pen', 'diamondwindows@gmail.com', '$2a$10$Sy.tYHDfxdWAd5IEE1qR9.zlRtgm8Qj3Gx/hG/Gy122Xi26GBFA9e', 'USER', 5);
/* For that user password is: qwerty */
INSERT INTO users (id,  created_at, updated_at, first_name, last_name, email, hashed_password, role, company_id)
  VALUES (9, '2018-02-01', '2018-02-01', 'Robo', 'Cop', 'toolthfairy@gmail.com', '$2a$10$Yy8NbL62VTt7OOOiBYqghOyS4lz6Hiq0q52X9KmZ1HdatdTIqctvy', 'USER', 6);



/* This piece of code fills the "templates" table with valid data which has relationships in other tables */
INSERT INTO templates (id, created_at, updated_at, text, is_product, is_selected, company_id, name)
VALUES (34, '2018-02-02', '2018-02-02', '<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invite</title>
    <style type="text/css">
        body { background-color: #fff; color: #666; text-align: justify; font-family: arial, sans-serif; }
        div.invite {
            width: 35em;
            padding: 4em 4em;
            margin: 5em auto 0 auto;
            border: 2px solid #ccc;
            border-right-color: #999;
            border-bottom-color: #999;
        }
        h1 { font-size: 100%; color: #666; line-height: 1.5em; }
    </style>
</head>
<body>
<div class="invite">

    <h1>Dear, <span>${userFullName:-}</span></h1>
    <p>Thank you for your recent purchase from <span>${companyName}</span></p>

    ${customText:-<div>
    <a><h1>Click here to review as on Adreviews</h1></a>

    <p>All reviews, good, bad or otherwise will be visible immediately.</p>

    <p>Thanks for your time.</p> </div>}

    <a href="${invitationUrl}">review</a>

    <p><b>Best regards</b></p>
    <p><a href="${companyWebsite}">${companyName}</a></p>

    <b>Please note:</b> This email is sent automatically, so you may have received this review invitation before the
    arrival of your package or service.<br />
    In this case, you are welcome to wait with writing your review until your package or service arrives.<br/><br/>

    <!--TODO need to change the name of resource-->
    If you want to opt out of receiving review invitation emails from Adreviews, please click <a
        href="${usubscribeUrl}">Unsubscribe</a>.<br/>
    Note that this includes all review invitation emails from all merchants using Adreviews’s review invitation
    service.


</div>
</body>
</html>', TRUE, TRUE, 4, 'For non-purchase experience');
INSERT INTO templates (id, created_at, updated_at, text, is_product, is_selected, company_id, name)
VALUES (35, '2018-01-01', '2018-01-01', '<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invite</title>
    <style type="text/css">
        body { background-color: #fff; color: #666; text-align: justify; font-family: arial, sans-serif; }
        div.invite {
            width: 35em;
            padding: 4em 4em;
            margin: 5em auto 0 auto;
            border: 2px solid #ccc;
            border-right-color: #999;
            border-bottom-color: #999;
        }
        h1 { font-size: 100%; color: #666; line-height: 1.5em; }
    </style>
</head>
<body>
<div class="invite">

    <h1>Dear, <span>${userFullName:-}</span></h1>
    <p>Thank you for your recent purchase from <span>${companyName}</span></p>

    ${customText:-<div>
    <a><h1>Click here to review as on Adreviews</h1></a>

    <p>All reviews, good, bad or otherwise will be visible immediately.</p>

    <p>Thanks for your time.</p> </div>}

    <a href="${invitationUrl}">review</a>

    <p><b>Best regards</b></p>
    <p><a href="${companyWebsite}">${companyName}</a></p>

    <b>Please note:</b> This email is sent automatically, so you may have received this review invitation before the
    arrival of your package or service.<br />
    In this case, you are welcome to wait with writing your review until your package or service arrives.<br/><br/>

    <!--TODO need to change the name of resource-->
    If you want to opt out of receiving review invitation emails from Adreviews, please click <a
        href="${usubscribeUrl}">Unsubscribe</a>.<br/>
    Note that this includes all review invitation emails from all merchants using Adreviews’s review invitation
    service.


</div>
</body>
</html>', TRUE, TRUE, 5, 'For non-purchase experience');
INSERT INTO templates (id, created_at, updated_at, text, is_product, is_selected, company_id, name)
VALUES (36, '2018-02-01', '2018-02-01', '<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invite</title>
    <style type="text/css">
        body { background-color: #fff; color: #666; text-align: justify; font-family: arial, sans-serif; }
        div.invite {
            width: 35em;
            padding: 4em 4em;
            margin: 5em auto 0 auto;
            border: 2px solid #ccc;
            border-right-color: #999;
            border-bottom-color: #999;
        }
        h1 { font-size: 100%; color: #666; line-height: 1.5em; }
    </style>
</head>
<body>
<div class="invite">

    <h1>Dear, <span>${userFullName:-}</span></h1>
    <p>Thank you for your recent purchase from <span>${companyName}</span></p>

    ${customText:-<div>
    <a><h1>Click here to review as on Adreviews</h1></a>

    <p>All reviews, good, bad or otherwise will be visible immediately.</p>

    <p>Thanks for your time.</p> </div>}

    <a href="${invitationUrl}">review</a>

    <p><b>Best regards</b></p>
    <p><a href="${companyWebsite}">${companyName}</a></p>

    <b>Please note:</b> This email is sent automatically, so you may have received this review invitation before the
    arrival of your package or service.<br />
    In this case, you are welcome to wait with writing your review until your package or service arrives.<br/><br/>

    <!--TODO need to change the name of resource-->
    If you want to opt out of receiving review invitation emails from Adreviews, please click <a
        href="${usubscribeUrl}">Unsubscribe</a>.<br/>
    Note that this includes all review invitation emails from all merchants using Adreviews’s review invitation
    service.


</div>
</body>
</html>', FALSE, TRUE, 6, 'For non-purchase experience');



/* This piece of code fills the "invitations" table with valid data which has relationships in other tables */

INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (10, '2018-03-01', '2018-03-01', 'vasyl.pahomenko2018@protonmail.com', 'Vasia', 'DELIVERED', 'd6afa279-b9b2-4fb2-8348-578978758360', 4, 34, '2018-03-01', 'MANUAL');
INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (11, '2018-03-05', '2018-03-05', 'Test001@protonmail.com', 'Johnny', 'DELIVERED', 'd6afa279-b9b2-4fb2-8348-578978758362', 4, 34, '2018-03-01', 'MANUAL');
INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (12, '2018-03-03', '2018-03-03', 'Test002@protonmail.com', 'Roy', 'DELIVERED', 'd6afa279-b9b2-4fb2-8348-578978758363', 4, 34, '2018-03-01', 'MANUAL');

INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (13, '2018-03-02', '2018-03-02', 'vasyl.pahomenko2018@protonmail.com', 'Vasia', 'DELIVERED', 'b6bc76cd-f907-4a6b-b582-4337430bf3b1', 5, 35, '2018-03-01', 'UPLOAD_FILE');
INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (14, '2018-03-05', '2018-03-05', 'Test003@protonmail.com', 'Kate', 'DELIVERED', 'd6afa279-b9b2-4fb2-8348-578978758364', 5, 35, '2018-03-01', 'COPY_PASTE');
INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (15, '2018-03-06', '2018-03-06', 'Test004@protonmail.com', 'Anna', 'DELIVERED', 'd6afa279-b9b2-4fb2-8348-578978758365', 5, 35, '2018-03-01', 'MANUAL');

INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (16, '2018-03-01', '2018-03-01', 'vasyl.pahomenko2018@protonmail.com', 'Vasia', 'DELIVERED', '95966ec9-94a0-41df-8c16-87c36dcfb693', 6, 36, '2018-02-27', 'COPY_PASTE');
INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
VALUES (17, '2018-03-01', '2018-03-01', 'Test005@protonmail.com', 'Vova', 'DELIVERED', 'd6afa279-b9b2-4fb2-8348-578978758366', 6, 36, '2018-03-01', 'MANUAL');
INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
VALUES (18, '2018-03-01', '2018-03-01', 'Test006@protonmail.com', 'Grisha', 'DELIVERED', 'd6afa279-b9b2-4fb2-8348-578978758367', 6, 36, '2018-03-01', 'UPLOAD_FILE');

INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (19, '2018-03-01', '2018-03-01', 'Test007@protonmail.com', 'Petro', 'WAITING', 'ec2bcc08-2f6b-4955-8722-cee51df32fd9', 4, 34, NULL, 'MANUAL');
INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (20, '2018-03-01', '2018-03-01', 'Test008@protonmail.com', 'Adam', 'NOT_DELIVERED', '05c489c5-a7ed-49a3-a39e-e71734d44e4f', 4, 34, NULL, 'UPLOAD_FILE');
INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (21, '2018-03-01', '2018-03-02', 'vasyl.pahomenko2018@protonmail.com', 'Vasia', 'NOT_VALID_EMAIL', 'bb06a429-308f-468b-ad13-ba833a75acb8', 4, 34, NULL, 'MANUAL');
INSERT INTO invitations (id, created_at, updated_at, recipient_email, recipient_name, invitation_status, token, company_id, template_id, sent_at, invitation_method)
  VALUES (37, '2018-03-01', '2018-03-02', 'Test009@protonmail.com', 'Valeriy', 'UN_SUBSCRIBE', 'ebebfd2e-eba6-44a7-aacc-0dc4ab449ffb', 4, 34, '2018-01-21', 'MANUAL');



/* This piece of code fills the "reviews" table with valid data which has relationships in other tables */

INSERT INTO reviews (id, created_at, updated_at, description, rating, invitation_id, company_id, title)
  VALUES (22, '2018-03-11', '2018-03-11', 'Very fast installation', 4, 10, 4, 'Honest company');
INSERT INTO reviews (id, created_at, updated_at, description, rating, invitation_id, company_id, title)
  VALUES (23, '2018-03-21', '2018-03-21', 'Nice job', 4, 11, 4, 'Nice job');
INSERT INTO reviews (id, created_at, updated_at, description, rating, invitation_id, company_id, title)
  VALUES (24, '2018-03-23', '2018-03-23', 'We will not recommend to our friends', 2, 12, 4, 'It is awful!!!');

INSERT INTO reviews (id, created_at, updated_at, description, rating, invitation_id, company_id, title)
  VALUES (25, '2018-03-15', '2018-03-15', 'Highest price on the market', 3, 13, 5, 'Very expensive');
INSERT INTO reviews (id, created_at, updated_at, description, rating, invitation_id, company_id, title)
  VALUES (26, '2018-03-16', '2018-03-16', 'I have expected better quality for the money', 3, 14, 5, 'So so');
INSERT INTO reviews (id, created_at, updated_at, description, rating, invitation_id, company_id, title)
  VALUES (27, '2018-03-16', '2018-03-16', 'We will not recommend to our neighbors', 3, 15, 5, 'I am disappointed');

INSERT INTO reviews (id, created_at, updated_at, description, rating, invitation_id, company_id, title)
  VALUES (28, '2018-03-17', '2018-03-17', 'No pain at all', 5, 16, 6, 'Best dentist ever');
INSERT INTO reviews (id, created_at, updated_at, description, rating, invitation_id, company_id, title)
  VALUES (29, '2018-03-17', '2018-03-17', 'Very cheap in comparison with prices on the market', 4, 17, 6, 'Nice doctor');
INSERT INTO reviews (id, created_at, updated_at, description, rating, invitation_id, company_id, title)
  VALUES (30, '2018-03-17', '2018-03-17', 'We will bring our children here', 5, 18, 6, 'Very best dentist');



/* This piece of code fills the "logos" table with valid data which has relationships in other tables */
/*
Please consider that you need to insert byte[] for image column manually with help of application due
 to the additional soft encoding of image before insert.
 */

INSERT INTO logos (id, created_at, updated_at, content_type)
  VALUES (31, '2018-02-02', '2018-02-02', 'image/jpeg');
INSERT INTO logos (id, created_at, updated_at, content_type)
  VALUES (32, '2018-01-01', '2018-01-01', 'image/jpeg');
INSERT INTO logos (id, created_at, updated_at, content_type)
  VALUES (33, '2018-02-01', '2018-02-01', 'image/jpeg');



UPDATE companies SET logo_id = 31 WHERE id = 4;
UPDATE companies SET logo_id = 32 WHERE id = 5;
UPDATE companies SET logo_id = 33 WHERE id = 6;