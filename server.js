import express from "express";
import cors from "cors";  
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const filePath = "./inventory.json";

app.get("/api/inventory", async (req, res) => {  
  try {
    if (!fs.existsSync(filePath)) {  // ✅ ファイルが存在するかチェック！
      return res.status(404).json({ error: "データファイルが見つかりません。" });
    }
    const data = await fs.promises.readFile(filePath, "utf8");
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("❌ ファイル読み込みエラー:", error);
    res.status(500).json({ error: "データを読み込めませんでした。" });
  }
});

app.post("/api/update-inventory", async (req, res) => {
  try {
    const updatedInventory = req.body;
    console.log("✅ 保存されるデータ:", updatedInventory);  // ✅ 受け取ったデータを確認！
    await fs.promises.writeFile("./inventory.json", JSON.stringify(updatedInventory, null, 2), "utf8");
    res.json({ success: true, message: "在庫データが更新されました！" });
  } catch (error) {
    console.error("❌ データ更新エラー:", error);
    res.status(500).json({ error: "在庫データの更新に失敗しました。" });
  }
});

export default app;
