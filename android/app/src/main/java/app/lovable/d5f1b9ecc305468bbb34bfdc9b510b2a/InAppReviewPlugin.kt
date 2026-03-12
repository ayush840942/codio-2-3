package web.codezen

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "InAppReview")
class InAppReviewPlugin : Plugin() {

    @PluginMethod
    fun triggerReview(call: PluginCall) {
        val activity = activity
        if (activity == null) {
            call.reject("Activity is null")
            return
        }

        InAppReviewHelper.showInAppReview(activity)
        call.resolve()
    }
}
