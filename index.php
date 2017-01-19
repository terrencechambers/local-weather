<?php
/**
 * Created by PhpStorm.
 * User: Terrence Chambers
 * Date: 1/14/17
 * Time: 1:03 PM
 */


ini_set("display_errors", 1);
error_reporting(E_ALL);

require_once __DIR__.'/../vendor/autoload.php';

$app = new \Slim\Slim();

//register bindings
include_once __DIR__.'/../app/bootstrap/container.php';
include_once __DIR__.'/../app/routes.php';
$app->run();

/*delete after first run created roles
$app->container->sentinel->getRoleRepository()->createModel()->create(array(
    'name'          => 'Admin',
    'slug'          => 'admin',
    'permissions'   => array(
        'user.create' => true,
        'user.update' => true,
        'user.delete' => true
    ),
));

$app->container->sentinel->getRoleRepository()->createModel()->create(array(
    'name'          => 'User',
    'slug'          => 'user',
    'permissions'   => array(
        'user.update' => true
    ),
));
*/