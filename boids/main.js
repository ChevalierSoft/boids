const g_flock = [];

function setup()
{
	createCanvas(475, 900);
	for (let i = 0; i < 200; ++i)
		g_flock.push(new Boid());
}


function draw()
{
	background(51, 51, 51, 40);
	
	for (let boid of g_flock)
	{
		boid.edges();
		boid.flock(g_flock);
		boid.update();
		boid.show();
	}
}

function mousePressed()
{
	// for (let boid of g_flock)
	// {
	// 	let	mouse = dist( mouseX, mouseY, boid.position.x, boid.position.y);
	// 	// mouse.setMag(boid.maxSpeed);
	// 	// mouse.sub(boid.velocity);
	// 	boid.acceleration.add(mouse); //createVector(mouseX, mouseY);
	// }
	// rect(mouseX, mouseY, 100, 100);

	let tmp = new Boid();
	tmp.position = createVector(mouseX, mouseY);
	g_flock.push(tmp);
}