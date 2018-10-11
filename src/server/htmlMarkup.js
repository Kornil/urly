const htmlMarkup = markup => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Url shortener</title>

  <meta name="mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="#dfdfdf">
  <meta name="application-name" content="personal-website">
  <meta name="Description" content="Input url -> get shorter one back">

  <style>
    html,
    body,
    #root {
      margin: 0;
      height: 100%;
    }
  </style>

</head>

<body>
<div id="root">${markup}</div>
</body>
<script src="/bundle.js" defer></script>

</html>
`;

export default htmlMarkup;
