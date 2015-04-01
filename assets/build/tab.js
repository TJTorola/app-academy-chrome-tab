var Link = React.createClass({displayName: "Link",
  render: function() {
    return (
      React.createElement("a", {href: this.props.url}, this.props.title)
    )
  }
});

var PageLinksListItem = React.createClass({displayName: "PageLinksListItem",
  render: function() {
    var subLink = this.props.link.sub ? React.createElement(PageLinksSubList, {links: this.props.link.sub}) : null;

    return (
      React.createElement("li", null, 
        React.createElement("a", {href: this.props.link.url}, this.props.link.title), 
        subLink
      )
    );
  }
});


var PageLinksSubList = React.createClass({displayName: "PageLinksSubList",
  render: function() {
    var links = [];

    this.props.links.forEach(function(link, index){
      var key = "link-" + index;

      links.push(
        React.createElement(PageLinksListItem, {key: key, link: link})
      )
    });

    return (
      React.createElement("ul", null, 
        links
      )
    );
  }
});


var PageLinksList = React.createClass({displayName: "PageLinksList",
  render: function() {
    return (
      React.createElement("section", null, 
        React.createElement("h2", null, this.props.title), 
        React.createElement(PageLinksSubList, {links: this.props.links})
      )
    );
  }
});


var PageLinks = React.createClass({displayName: "PageLinks",
  render: function() {
    var lists = []

    this.props.links.forEach(function(list, index){
      var key = "links-list-" + index;

      lists.push(
        React.createElement(PageLinksList, {key: key, title: list.title, links: list.links})
      )
    });

    return (
      React.createElement("main", {className: "group"}, 
        lists
      )
    );
  }
});


var PageHeaderInfo = React.createClass({displayName: "PageHeaderInfo",
  render: function() {
    var pod = this.props.core.pod.toString();
    var desk = this.props.core.desk.toString();
    var pair = this.props.day.pods[pod].pairs[desk];

    return (
      React.createElement("div", {id: "info"}, 
        React.createElement("p", null, this.props.day.dateStamp, " — ", this.props.day.day, " — ", React.createElement(Pair, {pair: pair}))
      )
    );
  }
});


var PageHeaderClock = React.createClass({displayName: "PageHeaderClock",
  getInitialState: function() {
    return {time: "0:00"};
  },

  componentWillMount: function() {
    this.interval = null;
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  componentDidMount: function() {
    this.updateTime();
    this.interval = setInterval(this.updateTime, 10000);
  },

  updateTime: function() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

    this.setState({time: currentHours + ":" + currentMinutes});
  },

  render: function() {
    return (
      React.createElement("h1", {id: "clock"}, this.state.time)
    );
  }
});


var PageHeader = React.createClass({displayName: "PageHeader",
  render: function() {
    var desk = this.props.core.desk ? this.props.core.desk : "•";

    return (
      React.createElement("header", {className: "clock-wrap"}, 
        React.createElement("h2", {id: "desk"}, desk), 
        React.createElement(PageHeaderClock, null), 
        React.createElement(PageHeaderInfo, {core: this.props.core, day: this.props.day})
      )
    );
  }
});


var Page = React.createClass({displayName: "Page",
  render: function() {
    return (
      React.createElement("div", {className: "wrap"}, 
        React.createElement(PageHeader, {core: this.props.core, day: this.props.day}), 
        React.createElement(PageLinks, {ord: this.props.day.ord, links: this.props.links}), 
        React.createElement("h3", {className: "localhost"}, 
          React.createElement("a", {href: "http://localhost:3000/"}, "Localhost:3000")
        )
      )
    );
  }
});

var CornerLink = React.createClass({displayName: "CornerLink",
  render: function() {
    return (
      React.createElement("li", null, 
        React.createElement("a", {href: this.props.url}, this.props.title)
      )
    )
  }
})


var Corners = React.createClass({displayName: "Corners",
  render: function() {
    var links = [];

    this.props.corners.forEach(function(link, index){
      var key = "corner-" + index;

      links.push(
        React.createElement(CornerLink, {key: key, url: link.url, title: link.title})
      );
    });

    return (
      React.createElement("nav", null, 
        React.createElement("ul", null, 
          links
        )
      )
    );
  }
});


var Header = React.createClass({displayName: "Header",
  render: function() {

    var city = this.props.core.cityId == 1 ? "NYC" : "SF";
    var degreeCel = parseInt(this.props.weather.main.temp);
    var degreeFar = parseInt((degreeCel * 9 / 5) + 32);

    return (
      React.createElement("header", {className: "header group"}, 
        React.createElement("em", {className: "weather-left"}, 
          city, " / ", this.props.weather.weather[0].main, 
          React.createElement("span", {className: "weather-hidden"}, " — ", this.props.weather.weather[0].description)
        ), 

        React.createElement("em", {className: "weather-right"}, 
          React.createElement("span", {className: "weather-hidden"}, degreeFar, " ° F / "), 
          degreeCel, " ° C"
        ), 

        React.createElement("h1", {className: "logo"}, 
          React.createElement("a", {href: "http://www.appacademy.io/"}, "App Academy")
        )
      )
    );
  }
});


var Pair = React.createClass({displayName: "Pair",
  render: function() {
    var pair = [];

    this.props.pair.forEach(function(student, index){
      var key = "link-" + student.github;

      pair.push(
        React.createElement(Link, {key: key, url: student.github, title: student.name})
      );

      if (this.props.pair.length - 1 > index) {
        pair.push(" & ");
      }
    }.bind(this));

    return (
      React.createElement("span", {className: "pair"}, pair)
    )
  }
})


var DesksPairListItem = React.createClass({displayName: "DesksPairListItem",
  render: function() {
    return (
      React.createElement("li", null, 
      React.createElement("strong", null, this.props.desk), " — ", React.createElement(Pair, {pair: this.props.pair})
      )
    );
  }
});


var DesksPairList = React.createClass({displayName: "DesksPairList",
  render: function() {
    var pairs = []
    var desks = Object.getOwnPropertyNames(this.props.pod.pairs);

    desks.forEach(function(desk, index){
      var key = "pair-" + index;

      pairs.push(
        React.createElement(DesksPairListItem, {
          key: key, 
          desk: desk, 
          pair: this.props.pod.pairs[desk]})
      );
    }.bind(this));

    return (
      React.createElement("ul", null, 
        pairs
      )
    );
  }
});


var Desks = React.createClass({displayName: "Desks",
  render: function() {
    var pod = this.props.day.pods[this.props.core.pod.toString()];

    return (
      React.createElement("article", {id: "desks"}, 
        React.createElement("span", null, "×"), 
        React.createElement("h1", null, this.props.day.day, " Desks"), 
        React.createElement("h2", null, pod.name, " — ", pod.instructor), 

        React.createElement(DesksPairList, {pod: pod})
      )
    );
  }
});

var Body = React.createClass({displayName: "Body",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Header, {
          core: this.props.data.core, 
          weather: this.props.data.weather}), 

        React.createElement(Corners, {
          corners: this.props.data.corners}), 

        React.createElement(Desks, {
          core: this.props.data.core, 
          day: this.props.data.day}), 

        React.createElement(Page, {
          core: this.props.data.core, 
          day: this.props.data.day, 
          links: this.props.data.links}), 

        React.createElement("footer", null, 
          React.createElement("a", {href: "options.html"}, "Options")
        )
      )
    );
  }
});

$(function(){
  React.render(
    React.createElement(Body, {data: Data}),
    document.body
  );
});
