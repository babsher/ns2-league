var mediator = module.exports = {};
mediator.on = Backbone.Events.on;
mediator.off = Backbone.Events.off;
mediator.trigger = Backbone.Events.trigger;
mediator._callbacks = null;