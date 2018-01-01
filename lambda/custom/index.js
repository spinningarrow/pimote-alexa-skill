const Alexa = require('alexa-sdk')
const PubNub = require('pubnub')
const pubnub = new PubNub({
	publishKey : '',
	subscribeKey : ''
})

const APP_ID = undefined

const SKILL_NAME = 'Pimote'
const HELP_MESSAGE = 'You can control your devices... What can I help you with?'
const HELP_REPROMPT = 'What can I help you with?'
const STOP_MESSAGE = 'Goodbye!'

exports.handler = function (event, context, callback) {
	const alexa = Alexa.handler(event, context)
	alexa.appId = APP_ID
	alexa.registerHandlers(handlers)
	alexa.execute()
}

const handlers = {
	'LaunchRequest': function () {
		this.emit('TurnOnTVIntent')
	},

	'TurnOnTVIntent': function () {
		pubnub.publish({
			channel: 'hello_world',
			message: {
				device: 'TV',
				action: 'power',
			}
		}, (status, response) => {
			console.log('PUBNUB', status, response)

			this.response.cardRenderer(SKILL_NAME, JSON.stringify(response))
			this.response.speak('OK')
			this.emit(':responseReady')
		})
	},

	'TurnOnReceiverIntent': function () {
		pubnub.publish({
			channel: 'hello_world',
			message: {
				device: 'receiver',
				action: 'power-on',
			}
		}, (status, response) => {
			console.log('PUBNUB', status, response)

			this.response.cardRenderer(SKILL_NAME, JSON.stringify(response))
			this.response.speak('OK')
			this.emit(':responseReady')
		})
	},

	'TurnOffReceiverIntent': function () {
		pubnub.publish({
			channel: 'hello_world',
			message: {
				device: 'receiver',
				action: 'power-off',
			}
		}, (status, response) => {
			console.log('PUBNUB', status, response)

			this.response.cardRenderer(SKILL_NAME, JSON.stringify(response))
			this.response.speak('OK')
			this.emit(':responseReady')
		})
	},

	'AMAZON.HelpIntent': function () {
		const speechOutput = HELP_MESSAGE
		const reprompt = HELP_REPROMPT

		this.response.speak(speechOutput).listen(reprompt)
		this.emit(':responseReady')
	},

	'AMAZON.CancelIntent': function () {
		this.response.speak(STOP_MESSAGE)
		this.emit(':responseReady')
	},

	'AMAZON.StopIntent': function () {
		this.response.speak(STOP_MESSAGE)
		this.emit(':responseReady')
	},
}
