var UserPage = React.createClass({
  getInitialState: function() {
    return { userName: '--' };
  },
  handleClick:function(u){
    this.setState({ userName: u.name });
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-8">
          <UserTable data={this.props.data} onHandleClick={this.handleClick} />
        </div>
        <div className="col-md-4">
          <UserDetail name={this.state.userName} />
        </div>
      </div>
    );
  }
});



var UserTable = React.createClass({
  handleClick: function(u){
    this.props.onHandleClick(u);
  },
  render: function(){
    var self = this;
    var users = this.props.data.map(function (u) {
      return (
        <UserRow name={u.name} role={u.role} onHandleClick={self.handleClick} />
      );
    });
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Name</td>
            <td>Role</td>
          </tr>
        </thead>
        <tbody>
          {users}
        </tbody>
      </table>
    );
  }
});

var UserRow = React.createClass({
  handleClick: function(){
    this.props.onHandleClick(this.props);
  },
  render: function(){
    return (
      <tr>
        <td><a href="#" onClick={this.handleClick}>{this.props.name}</a></td>
        <td>{this.props.role}</td>
      </tr>
    );
  }
});



var UserDetail = React.createClass({
  render: function(){
    return (
      <div>Detail: {this.props.name}</div>
    );
  }
});

var data = [
  {name: 'ema', role: 'admin'},
  {name: 'ale', role: 'admin'},
  {name: 'alb', role: 'dev'},
  {name: 'madda', role: 'dev'},
  {name: 'ste', role: 'dev'},
  {name: 'vale', role: 'dev'},

];


React.render(
  <UserPage data={data}/>,
  document.getElementById('container')
);