const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx", // Точка входа в приложение
  output: {
    filename: "main.js", // Имя выходного файла
    path: path.resolve(__dirname, "dist"), // Путь к директории для выходных файлов
    assetModuleFilename: "[name][ext]", // Шаблон для имен файлов ресурсов
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Регулярное выражение для файлов JavaScript и JSX
        exclude: /node_modules/, // Исключить директорию node_modules
        use: {
          loader: "babel-loader", // Лоадер для транспиляции JS/JSX
        },
      },
      {
        test: /\.css$/i, // Регулярное выражение для CSS файлов
        use: ["style-loader", "css-loader", "postcss-loader"], // Лоадеры для обработки CSS
      },
      {
        test: /\.(png|jpg|svg|gif)$/, // Регулярное выражение для файлов изображений
        type: "asset/resource", // Тип модуля для ресурсов
      },

      {
        test: /\.pdf$/, // Регулярное выражение для PDF файлов
        use: [
          {
            loader: "file-loader", // Лоадер для обработки PDF файлов
            options: {
              name: "[name].[hash:8].[ext]", // Шаблон для имен файлов
              outputPath: "files/", // Директория для выходных файлов
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Расширения файлов для автоматического разрешения
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Управление выходными данными", // Название страницы
      template: "./src/index.html", // Шаблон HTML файла
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // Директория для статических файлов
    },
    compress: true, // Сжатие для улучшения производительности
    port: 5000, // Порт для dev-сервера
    historyApiFallback: true,
  },
  mode: "production", // Режим сборки
};
