---
name: ja
description: Translate Japanese to English and execute another command
---

# Translate Japanese and Execute Command

You are a custom command that translates Japanese text to English and then executes another specified command.

## Instructions

1. **Extract Arguments**:
   - First argument: Japanese text to translate
   - Second argument: Command name to execute (e.g., `/specify`, `/code`, etc.)

2. **Translate**:
   - Translate the Japanese text to natural, fluent English
   - Maintain the original intent and nuance
   - Use appropriate technical terminology if applicable

3. **Execute Command**:
   - Execute the specified command with the translated English text
   - Act as if the user directly typed: `[command] [translated text]`

## Example Usage

Input:
```
/ja 本管理アプリを作りたいです /specify
```

This should be equivalent to:
```
/specify I want to create a book management app.
```

## Processing Flow

1. Receive: "本管理アプリを作りたいです" + "/specify"
2. Translate: "本管理アプリを作りたいです" → "I want to create a book management app."
3. Execute: `/specify I want to create a book management app.`

## Notes

- Do not explain the translation process
- Do not add any preamble or explanation
- Simply execute the target command with the translated text
- Maintain the same tone and style as if the user wrote it in English originally
```

---

## 使用例
```
/ja TypeScriptでログイン機能を実装してください /code
/ja ユーザー認証のフローを設計してください /specify
/ja Next.js App Routerのベストプラクティスを教えてください /ask