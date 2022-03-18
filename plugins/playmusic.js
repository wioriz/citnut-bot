const {MessageActionRow, MessageButton} = citnut.Discord
const allowedMentions = citnut.allowedMentions
const {defaultemb} = citnut
const {Player, QueueRepeatMode} = require("discord-player")
const player = new Player(bot, {ytdlDownsloadOptions:{filter:"audioonly"}})
bot.player = player
const filter = ["List","Skip","NowPlay","Stop","Pause","Resume","Loop","Nextmenu2","Nextmenu1","Clear"]
const row = new MessageActionRow().addComponents(
			new MessageButton().setCustomId('NowPlay').setLabel('now play').setStyle('PRIMARY'),
            new MessageButton().setCustomId('List').setLabel('List').setStyle('PRIMARY'),
            new MessageButton().setCustomId('Skip').setLabel('Skip').setStyle('PRIMARY'),
            new MessageButton().setCustomId('Loop').setLabel('Loop').setStyle('PRIMARY'),
            new MessageButton().setCustomId('Nextmenu2').setLabel('menu >').setStyle('PRIMARY')
			)
const row2 =new MessageActionRow().addComponents(
            new MessageButton().setCustomId('Pause').setLabel('Pause').setStyle('PRIMARY'),
            new MessageButton().setCustomId('Resume').setLabel('Resume').setStyle('PRIMARY'),
            new MessageButton().setCustomId('Stop').setLabel('Stop').setStyle('DANGER'),
            new MessageButton().setCustomId('Clear').setLabel('Clear').setStyle('DANGER'),
            new MessageButton().setCustomId('Nextmenu1').setLabel('menu >').setStyle('PRIMARY')
           )
const isPlaying = (queue,data,avt) => {
    if (!queue || !queue.playing) return data.update({embeds:[defaultemb("Hãy phát một bản nhạc").setTitle("Không có bản nhạc nào đang phát").setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})]})
 }
module.exports = {
	command: ["play"],
	author: "Citnut",
	description: "music :()",
	guide: "<link/text>",
	allowListening: true,
    allowInteraction: true,
    async interaction (data) {
        let {customId} = data
        if (!data.guildId || !filter.includes(customId)) return

        let avt = (data.user).displayAvatarURL({size: 1024, dynamic: true})
        let queue = player.getQueue(data.guildId)
        switch (customId) {
            case "NowPlay":
                if (isPlaying(queue,data,avt)) return
                const nowTrack = queue.nowPlaying()
                const progressbar = queue.createProgressBar()
                data.update({embeds:[defaultemb(nowTrack.title+"\n\n"+progressbar).setTitle("Đang phát:").setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})]})
            break
            case "List":
                if (isPlaying(queue,data,avt)) return
                if (!queue.tracks[0]) return data.update({embeds:[defaultemb("Hãy thêm bài hát").setTitle("Hàng chờ trống!").setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})],components:[row]})
                if (queue.tracks.length === 1) return data.update({embeds:[defaultemb("Tác giả: "+queue.tracks[0].author).setTitle(queue.tracks[0].title).setThumbnail(queue.tracks[0].thumbnail).setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})],components:[row]})
              
                let listplay = ""
                
                for (let all of queue.tracks) {
                    listplay += all.author + ": " + all.title + "\n"
                }
                await data.update({embeds:[defaultemb("Hiện có "+queue.tracks.length+" bài hát đang chờ"+"\n"+listplay).setTitle("Hàng chờ:").setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})]})
            break
            case "Skip":
                if (isPlaying(queue,data,avt)) return
                queue.skip()
                data.update({embeds:[defaultemb(
                    queue.tracks[0]?"Bài hát tiếp theo:\n"+queue.tracks[0].title:"Không có bài hát nào trong hàng chờ"
                ).setTitle("Đã bỏ qua bài hát hiện tại").setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})]
                })
            break
            case "Stop":
                if (isPlaying(queue,data,avt)) return
                queue.destroy()
                data.update({embeds:[defaultemb("đã dừng phát nhạc").setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})]})
            break
            case "Pause":
                if (isPlaying(queue,data,avt)) return
                const pause = queue.setPaused(true)
                data.update({embeds:[defaultemb(pause?"đã tạm dừng phát nhạc":"đã sảy ra lỗi").setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})]})
            break
            case "Resume":
                if (isPlaying(queue,data,avt)) return
                const Resume = queue.setPaused(false)
                data.update({embeds:[defaultemb(Resume?"tiếp tục phát nhạc":"đã sảy ra lỗi").setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})]})
            break
            case "Loop":
                if (isPlaying(queue,data,avt)) return
                let repeatmode = "chế độ lặp lại: "
                let checkrp = queue.setRepeatMode(queue.repeatMode!=3?queue.repeatMode+1:0)
                repeatmode += queue.repeatMode == QueueRepeatMode.OFF?"tắt":queue.repeatMode == QueueRepeatMode.TRACK?"track":queue.repeatMode == QueueRepeatMode.QUEUE?"queue":"autoplay"
                data.update({embeds:[defaultemb(`${checkrp?repeatmode:"đã xảy ra lỗi"}`).setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})]})              
            break
            case "Nextmenu2":
                data.update({components:[row2]})
            break
            case "Nextmenu1":
                data.update({components:[row]})
            break
            case "Clear":
                if (isPlaying(queue,data,avt)) return
                queue.clear()
                data.update({embeds:[defaultemb("đã xoá danh sách phát").setFooter({text:"tương tác bởi "+data.user.tag,iconURL:avt})]})
            break
            default:
            break
        }
    },
	async listen (data,db) {

	},
	async call (data,db) {
        if (!data.guild) return data.reply({embeds:[defaultemb("bạn không thể sử dụng chức năng này tại đây!")],allowedMentions})
		let query = data.content.split(" ").slice(1).join(" ")
        if (!query) return data.reply({embeds:[defaultemb(`${citnut.config.prefix}${this.command[0]} <từ khoá hoặc đường link>`).setTitle("để phát một bản nhạc, sử dụng:")], allowedMentions, components: [row]})
    
        const queue = player.createQueue(data.guild, {
            ytdlOptions: {
                filter: 'audioonly',
                highWaterMark: 1 << 30,
                dlChunkSize: 0,
            },
            metadata: data.channel
        })
        
        try {
            if (!queue.connection) await queue.connect(data.member.voice.channel)
        } catch {
            queue.destroy()
            return await data.reply({ content: "Bạn cần ở trong kênh thoại!", ephemeral: true })
        }

        const track = await player.search(query, {
            requestedBy: data.user
        })
        
        if (!track.tracks[0]) return data.reply({ embeds: [defaultemb("> "+query).setTitle("không có kết quả tìm kiếm nào cho")], allowedMentions})
        if (!track.playlist) {
            queue.play(track.tracks[0])
            return data.reply({embeds:[defaultemb(track.tracks[0].title).setTitle("Đã tìm thấy bài hát:").setThumbnail(track.tracks[0].thumbnail)],components: [row]})
        }
        queue.addTracks(track.tracks)
        queue.play()
        return data.reply({embeds:[defaultemb(track.playlist.description.replaceAll("&#x2F;","/")).setTitle(track.playlist.title).setThumbnail(track.playlist.thumbnail)],components: [row]})

	}
}
