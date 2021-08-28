const g_flock = [];

function setup()
{
	createCanvas(475, 900);
	for (let i = 0; i < 100; ++i)
		g_flock.push(new Boid());
}


function draw()
{
	background(51);
	
	for (let boid of g_flock)
	{
		boid.edges();
		boid.flock(g_flock);
		boid.update();
		boid.show();
	}
}
