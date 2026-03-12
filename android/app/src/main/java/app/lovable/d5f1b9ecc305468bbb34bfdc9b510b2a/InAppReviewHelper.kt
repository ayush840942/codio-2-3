package web.codezen

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AlertDialog
import com.google.android.play.core.review.ReviewManagerFactory

object InAppReviewHelper {
    private const val PREFS_NAME = "CodioPrefs"
    private const val KEY_REVIEW_SHOWN = "reviewShown"

    fun showInAppReview(activity: Activity) {
        val sharedPrefs = activity.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        if (sharedPrefs.getBoolean(KEY_REVIEW_SHOWN, false)) {
            return
        }

        activity.runOnUiThread {
            AlertDialog.Builder(activity)
                .setTitle("Are you enjoying the game?")
                .setMessage("Your feedback helps us improve!")
                .setPositiveButton("Yes") { _, _ ->
                    launchGooglePlayReview(activity)
                }
                .setNegativeButton("No") { _, _ ->
                    openFeedbackScreen(activity)
                }
                .setCancelable(true)
                .show()
        }
    }

    private fun launchGooglePlayReview(activity: Activity) {
        val manager = ReviewManagerFactory.create(activity)
        val request = manager.requestReviewFlow()
        request.addOnCompleteListener { task ->
            if (task.isSuccessful) {
                val reviewInfo = task.result
                val flow = manager.launchReviewFlow(activity, reviewInfo)
                flow.addOnCompleteListener { _ ->
                    // The flow has finished. The API does not indicate whether the user
                    // reviewed or not, or even whether the review dialog was shown.
                    markReviewAsShown(activity)
                }
            } else {
                // There was some problem, continue regardless of the result.
                // We can't show the review, maybe try again later or just mark it as shown if it failed.
                // To be safe and compliant, we mark it as shown to not pester the user.
                markReviewAsShown(activity)
            }
        }
    }

    private fun openFeedbackScreen(activity: Activity) {
        val intent = Intent(Intent.ACTION_SENDTO).apply {
            data = Uri.parse("mailto:support@codezen.web")
            putExtra(Intent.EXTRA_SUBJECT, "Feedback for Codio")
        }
        try {
            activity.startActivity(intent)
        } catch (e: Exception) {
            // No email app installed
        }
        markReviewAsShown(activity)
    }

    private fun markReviewAsShown(activity: Activity) {
        val sharedPrefs = activity.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        sharedPrefs.edit().putBoolean(KEY_REVIEW_SHOWN, true).apply()
    }
}
