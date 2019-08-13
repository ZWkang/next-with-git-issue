const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const mkdirp = require("mkdirp");
const removeMd = require("remove-markdown");
const hljs = require("highlight.js"); // https://highlightjs.org/

const MarkdownIt = require("markdown-it")({
  breaks: true
  // highlight: function(str, lang) {
  //   if (lang && hljs.getLanguage(lang)) {
  //     try {
  //       return (
  //         '<pre class="hljs"><code>' +
  //         hljs.highlight(lang, str, true).value +
  //         "</code></pre>"
  //       );
  //     } catch (__) {}
  //   }

  //   return (
  //     '<pre class="hljs"><code>' +
  //     MarkdownIt.utils.escapeHtml(str) +
  //     "</code></pre>"
  //   );
  // }
});

const dataSplit = /^-{3}[\s\S]+?-{3}/;

function mdRender(str) {
  return MarkdownIt.render(str);
}

function handlePreview(str, previewNumber) {
  let index = 0;
  let cutPoint = 0;
  // console.log(str);
  const preview = str
    .split("\n")
    .map(_ => removeMd(_))
    .join(" ");
  while (index < previewNumber) {
    ++index;
    if (preview[index] === " ") {
      cutPoint = index;
    }
    //  到末尾
    if (preview[index] === undefined) {
      cutPoint = index;
      break;
    }
  }
  return preview.substring(0, cutPoint || index) + "...";
}

function resolveYamlAndMarkdown(json, opts) {
  const { body, databaseId } = json;
  let fileData = body;
  const hasData = dataSplit.test(fileData);
  let articleContent = fileData.trim();
  let metaData = {};
  if (hasData) {
    const cutMetaData = fileData.match(
      dataSplit[0].replace(/(^---)|(---$)/, "")
    );
    metaData = yaml.safeLoad(cutMetaData);
    articleContent = articleContent.substring(cutMetaData[0].length).trim();
  }
  const previewNumber = opts.preview || metaData.parseExt || 120;
  const parseExt = opts.parseExt || metaData.parseExt || "html";
  const prefix = opts.prefix || metaData.prefix || "";

  const pagePrefix = opts.pagePrefix || metaData.pagePrefix || "/page";

  const renderMd = mdRender(body);

  const preview = handlePreview(body, previewNumber);

  const virtualPath = prefix + pagePrefix + "/" + databaseId;
  let fileJsonData = Object.assign(json, metaData, {
    sourceExt: "md",
    parseExt: parseExt,
    prefix: prefix,
    virtualPath: virtualPath,
    bodyHTML: renderMd,
    preview: preview
  });

  return fileJsonData;
}

function readFileContent(file, cb) {
  if (!file || fs.lstatSync(file).isDirectory()) {
    return null;
  }
  fs.readFile(file, (err, data) => {
    cb(err, file, data && data.toString());
  });
}

module.exports = resolveYamlAndMarkdown;
