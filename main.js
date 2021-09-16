let g_flock = [];
let g_projectiles = [];

let deb = 0;

function setup()
{
	let nb_elem_at_startup = 400;

	frameRate(60);
	createCanvas(950, 950);
	for (let i = 0; i < nb_elem_at_startup; ++i)
		g_flock.push(new Boid(random(width), random(height)));
	background(50, 50, 50);
}

function draw()
{
	// background(0, 0, 0, 10);
	background(0, 0, 0);

	let boundary = new Rectangle(width / 2, height/2, width/2, height/2);
	let qt = new QuadTree(boundary, 4);
	for (let p of g_flock)
		qt.insert(p);
	// show QuadTree
	qt.show();

	for (let boid of g_flock)
	{
		let range = new Rectangle(boid.position.x, boid.position.y, boid.size, boid.size);
		let inside_range = qt.query(range);
		boid.edges();
		// boid.flock(g_flock);	// old
		boid.flock(inside_range);
		boid.update();
		boid.fire(g_projectiles);
		boid.show();
	}
	let i = 0;
	for (let fire of g_projectiles)
	{
		if (fire.lifetime <= 0)
		{
			g_projectiles.splice(i, 1);
		}
		fire.update();
		fire.show();
		++i;
	}

	// counter of Boids and Projectiles
	stroke(200);
	strokeWeight(4);
	fill(0);
	text(int(frameRate()), 100, 50);
	text(g_flock.length, 100, 70);
	text(g_projectiles.length, 100, 100);

}

function mouseDragged()
{
	for (let boid of g_flock)
	{
		let bmouse = createVector(mouseX - boid.position.x, mouseY - boid.position.y);
		boid.acceleration.add(bmouse);
	}	
}

function mouseClicked()
{
	g_flock.push(new Boid(mouseX, mouseY));
}
