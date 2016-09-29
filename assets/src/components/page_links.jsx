import React from 'react';

class PageLinksListItem extends React.Component {
	render() {
		var subLink = this.props.link.sub ? <PageLinksSubList links={this.props.link.sub} /> : null;

		return (
			<li>
				<a href={this.props.link.url}>{this.props.link.title}</a>
				{subLink}
			</li>
		);
	}
}


class PageLinksSubList extends React.Component {
	render() {
		var links = [];

		this.props.links.forEach(function(link, index){
			var key = "link-" + index;

			links.push(
				<PageLinksListItem key={key} link={link} />
			)
		});

		return (
			<ul>
				{links}
			</ul>
		);
	}
}


class PageLinksList extends React.Component {
	render() {
		return (
			<section>
				<h2>{this.props.title}</h2>
				<PageLinksSubList links={this.props.links} />
			</section>
		);
	}
}


export default class extends React.Component {
	render() {
		var lists = []

		this.props.links.forEach(function(list, index){
			var key = "links-list-" + index;

			lists.push(
				<PageLinksList key={key} title={list.title} links={list.links} />
			)
		});

		return (
			<main className="group">
				{lists}
			</main>
		);
	}
}