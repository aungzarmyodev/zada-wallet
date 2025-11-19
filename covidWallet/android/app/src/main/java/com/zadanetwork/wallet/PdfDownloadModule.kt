package com.zadanetwork.wallet;

import android.content.ContentValues
import android.content.Context
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.widget.Toast
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.FileInputStream
import java.io.OutputStream

class PdfDownloadModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "PdfDownload"
    }

    @ReactMethod
    fun savePdfToDownloads(filePath: String, fileName: String, promise: Promise) {
        try {
            val file = File(filePath)
            if (!file.exists()) {
                promise.reject("FILE_NOT_FOUND", "PDF file not found")
                return
            }

            val resolver = reactContext.contentResolver
            val mimeType = "application/pdf"
            val displayName = if (fileName.endsWith(".pdf")) fileName else "$fileName.pdf"

            val values = ContentValues().apply {
                put(MediaStore.MediaColumns.DISPLAY_NAME, displayName)
                put(MediaStore.MediaColumns.MIME_TYPE, mimeType)
                put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
            }

            val uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
                ?: throw Exception("Failed to create new MediaStore record")

            resolver.openOutputStream(uri)?.use { outStream: OutputStream ->
                FileInputStream(file).use { inputStream ->
                    inputStream.copyTo(outStream)
                }
            }

            promise.resolve("PDF saved to Downloads as $displayName")
        } catch (e: Exception) {
            promise.reject("SAVE_FAILED", e.message, e)
        }
    }
}