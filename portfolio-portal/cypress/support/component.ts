Cypress.Screenshot.defaults({
    onBeforeScreenshot($el) {
        const $clock = $el.find('.clock')

        if ($clock) {
        $clock.hide()
        }
    },

    onAfterScreenshot($el, props) {
        const $clock = $el.find('.clock')

        if ($clock) {
        $clock.show()
        }
    },
})