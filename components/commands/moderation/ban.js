module.exports = {
	cmd: function( msg, argSeparator ) {
		if ( msg.guild.me.hasPermission( 'BAN_MEMBERS' ) === false ) return msg.reply( 'I need the ban members permission for that command.' );
		const singleArgument = msg.content.substring( argSeparator );
		const mentionedUser = msg.mentions.members.first();
		
		if ( !mentionedUser ) return msg.reply( 'you need to mention the user that will be banned.' );
		if ( mentionedUser.bannable === false ) return msg.reply( 'I can\'t ban that user! o-o' );
		
		let banReason = 'Unspecified reason.';
		let daysToDelete = 0;

		if (singleArgument.split(" ")[1]) daysToDelete = ~~(singleArgument.split(" ")[1]);
		
		const quotMarkIndex = singleArgument.indexOf('"');
		const anotherQuotMarkIndex = singleArgument.indexOf('"', quotMarkIndex+1);
		if ( quotMarkIndex !== -1 && anotherQuotMarkIndex !== -1 ) banReason = singleArgument.substring(quotMarkIndex+1, anotherQuotMarkIndex);
		
		if ( Number.isNaN ( daysToDelete ) ) return msg.reply( 'the number of days doesn\'t look valid!' );
		
		return mentionedUser.ban({ days: daysToDelete, reason: banReason })
			.then( () => msg.channel.send( `${msg.author} banned ${mentionedUser} from the server! \n**Reason:** *${banReason}*.` ) )
			.catch( console.error );	
    }
};