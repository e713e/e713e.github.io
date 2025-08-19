<?php
header('Content-Type: text/html; charset=utf-8');

$file = 'quotes.json';
$statusMsg = '';

// داونلۆد کردن فایل JSON
if (isset($_GET['download'])) {
    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/json');
        header('Content-Disposition: attachment; filename="quotes.json"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    } else {
        echo 'فایلی quotes.json موجود نییە!';
        exit;
    }
}

// خوێندنەوەی وتەکان
if (file_exists($file)) {
    $jsonData = file_get_contents($file);
    $data = json_decode($jsonData, true);
    if (!isset($data['quotes'])) $data['quotes'] = [];
} else {
    $data = ['quotes' => []];
}

// زیادکردن وتە
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['newQuote'])) {
    $newQuote = trim($_POST['newQuote']);
    if ($newQuote !== '') {
        $data['quotes'][] = $newQuote;
        file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        $statusMsg = 'وتەکە زیادکرا بە سەرکەوتوویی!';
    }
}

// سڕینەوەی وتە بە POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['deleteIndex'])) {
    $index = intval($_POST['deleteIndex']);
    if (isset($data['quotes'][$index])) {
        array_splice($data['quotes'], $index, 1);
        file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        $statusMsg = 'وتەکە سڕایەوە بە سەرکەوتوویی!';
    }
}
?>

<!DOCTYPE html>
<html lang="ku" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>مدیریت وتەکان | e.713e</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-gray-100 min-h-screen p-6">

<h1 class="text-3xl font-bold mb-6 text-center">مدیریت وتەکان</h1>

<?php if ($statusMsg): ?>
<p class="mb-4 text-center <?= strpos($statusMsg, 'سەرکەوتوویی') !== false ? 'text-green-400' : 'text-red-500' ?>">
    <?= htmlspecialchars($statusMsg) ?>
</p>
<?php endif; ?>

<!-- فۆڕمی زیادکردن وتە -->
<div class="max-w-md mx-auto mb-8 bg-gray-800 p-6 rounded-xl">
  <form method="POST">
    <label for="newQuote" class="block mb-2 font-semibold">وتەی نوێ:</label>
    <textarea id="newQuote" name="newQuote" rows="3" class="w-full p-3 rounded-lg bg-gray-700 text-gray-100 mb-4" placeholder="وتەی نوێ بنووسە"></textarea>
    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg w-full transition">
      زیادکردن
    </button>
  </form>
</div>

<!-- لیستی وتەکان -->
<div class="max-w-md mx-auto bg-gray-800 p-6 rounded-xl mb-6">
<h2 class="text-xl font-bold mb-4">لیستی وتەکان</h2>
<?php if (empty($data['quotes'])): ?>
    <p class="text-gray-400">هیچ وتەیەک نییە.</p>
<?php else: ?>
    <ul class="space-y-3">
    <?php foreach ($data['quotes'] as $i => $quote): ?>
        <li class="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
            <span><?= htmlspecialchars($quote) ?></span>
            <form method="POST" style="margin:0;">
                <input type="hidden" name="deleteIndex" value="<?= $i ?>">
                <button type="submit" class="text-red-500 hover:text-red-700 font-bold">سڕینەوە</button>
            </form>
        </li>
    <?php endforeach; ?>
    </ul>
<?php endif; ?>
</div>

<!-- دوگمەی داونلۆد -->
<div class="text-center">
<a href="?download=1" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition">
  داونلۆد کردنی quotes.json
</a>
</div>

</body>
</html>
