const debug = require('debug')('slash-command-template:ticket');
const api = require('./api');
const payloads = require('./payloads');

/*
 *  Send ticket creation confirmation via
 *  chat.postMessage to the user who created it
 */
const sendConfirmation = async (ticket) => {
  // open a DM channel for that user
  let channel = await api.callAPIMethod('conversations.open', {
    user: ticket.userId
  })

  let message = payloads.confirmation({
    //devops-issues channel-id - need to move it out as an ENV_VAR
    channel_id: "C06L7MVH87Q",
    title: ticket.title,
    link: ticket.link,
    description: ticket.description,
    domain: ticket.domain,
    env: ticket.env,
    user: ticket.userId
  });

  let result = await api.callAPIMethod('chat.postMessage', message)
  debug('sendConfirmation: %o', result);
};

// Create helpdesk ticket. Call users.find to get the user's email address
// from their user ID
const create = async (userId, view) => {
  let values = view.state.values;

  let result = await api.callAPIMethod('users.info', {
    user: userId
  });

  await sendConfirmation({
    userId,
    userEmail: result.user.profile.email,
    title: values.title_block.title.value,
    link: values.link_block.link.value,
    description: values.description_block.description.value,
    domain: values.domain_block.domain.selected_option && values.domain_block.domain.selected_option.text.text,
    env: values.env_block.env.selected_option && values.env_block.env.selected_option.text.text

  });
};

module.exports = { create, sendConfirmation };
